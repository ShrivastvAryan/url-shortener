const mongoose=require('mongoose')

const urlSchema= new mongoose.Schema({
    originalUrl:{
        type:String,
        required:true,
        validate: {
            validator: function(v) {
                return /^https?:\/\/.+/.test(v);
            },
            message: 'Please provide a valid URL starting with http:// or https://'
        }
    },
    shortCode: {
        type: String,
        required: true,
        unique: true
    },
    visitCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const URL=mongoose.model('URL',urlSchema)

module.exports=URL