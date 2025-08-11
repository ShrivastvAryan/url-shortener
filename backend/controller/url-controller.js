const URL=require('../modal/url-modal')

// Generate a random shortcode
const generateShortCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

const urlForm=async (req,res)=>{
    try{
       const { originalUrl } = req.body;
       
       if (!originalUrl) {
           return res.status(400).json({message: "URL is required"});
       }

       // Check if URL already exists
       const existingUrl = await URL.findOne({ originalUrl });
       if (existingUrl) {
           return res.status(200).json({
               message: "URL already shortened",
               shortCode: existingUrl.shortCode,
               shortUrl: `${req.protocol}://${req.get('host')}/${existingUrl.shortCode}`,
               visitCount: existingUrl.visitCount
           });
       }

       // Generate unique shortcode
       let shortCode;
       let isUnique = false;
       while (!isUnique) {
           shortCode = generateShortCode();
           const existing = await URL.findOne({ shortCode });
           if (!existing) {
               isUnique = true;
           }
       }

       const newUrl = await URL.create({
           originalUrl,
           shortCode
       });

       return res.status(201).json({
           message: "URL shortened successfully",
           shortCode: newUrl.shortCode,
           shortUrl: `${req.protocol}://${req.get('host')}/${newUrl.shortCode}`,
           originalUrl: newUrl.originalUrl,
           visitCount: newUrl.visitCount
       });
    } catch(error){
        console.error('Error creating short URL:', error);
        return res.status(500).json({message: "Error creating short URL"});
    }
};

const urlRedirect=async(req,res)=>{
    try {
        const { shortCode } = req.params;
        
        if (!shortCode) {
            // If no shortcode provided, return all URLs
            const urls = await URL.find().sort({ createdAt: -1 });
            return res.status(200).json(urls);
        }

        // Find URL by shortcode
        const url = await URL.findOne({ shortCode });
        if (!url) {
            return res.status(404).json({ message: 'Short URL not found' });
        }

        // Increment visit count
        await URL.findByIdAndUpdate(url._id, { $inc: { visitCount: 1 } });

        // Redirect to original URL
        return res.redirect(url.originalUrl);
    } catch (error) {
        console.error('Error redirecting URL:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

// Admin function to get all URLs with visit counts
const getAllUrls = async (req, res) => {
    try {
        const urls = await URL.find().sort({ createdAt: -1 });
        return res.status(200).json(urls);
    } catch (error) {
        console.error('Error fetching URLs:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Admin function to delete a URL
const deleteUrl = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUrl = await URL.findByIdAndDelete(id);
        
        if (!deletedUrl) {
            return res.status(404).json({ message: 'URL not found' });
        }
        
        return res.status(200).json({ message: 'URL deleted successfully' });
    } catch (error) {
        console.error('Error deleting URL:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports= {urlForm,urlRedirect,getAllUrls,deleteUrl};