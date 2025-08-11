const mongoose=require('mongoose')

const URI=process.env.MONGODB_URI

const connectDb=async()=>{
    try {
        await mongoose.connect(URI)
        console.log('MongoDB successfully connected')
    } catch (error) {
        console.log('Error in connecting MongoDB',error)
        process.exit(0)
    }
}

module.exports=connectDb