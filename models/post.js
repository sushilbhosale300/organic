const mongoose  = require("mongoose");

const postSchema = new mongoose.Schema({

    title:String,
    content : String,
    keywords:[String],
   
    createdBy:{
        type:mongoose.Schema.Types.ObjectId, ref:'User' , required:true,
    },

},{
    timestamps : true,
})

module.exports = mongoose.model('Post',postSchema);



