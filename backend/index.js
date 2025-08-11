require('dotenv').config()
const express=require('express')
const cors = require("cors");
const app=express()
const PORT=5000
const urlRouter=require('./router/url-router') 
const urlController=require('./controller/url-controller')
const db=require('./db')

app.use(cors())
app.use(express.json())

db();

app.use('/api',urlRouter)

// Root-level shortcode redirect route (for public access)
app.get('/:shortCode', urlController.urlRedirect)

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});

app.listen(PORT,(error)=>{
    if(!error){
        console.log(`Server is running at ${PORT}`)
    }
    else{
        console.log('Error in server running')
    }
})
