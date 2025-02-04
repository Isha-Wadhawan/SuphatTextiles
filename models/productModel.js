const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please enter product name "],
        trim : true
    },
    description : {
        type : String, 
        required : [true, "Please enter product description "]
    },
    ratings:{
        type  : Number,
        default : 0
    },
    images  : [
        {
              public_id : {
            type : String,
            required : true
        },
        url : {
            type : String,
            required : true
        }
        }
      
    ],

    category : {
        type : String,
        required : [true, "Pls enter category"]
    },
    fabric : {
        type : String,
        required : [true, "Pls enter Fsbric Type"]
    },
    
    numOfreviews : { 
        type : Number,
        default  :0
    },
    reviews : [

        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref : "User",
                required : true
            },
            name :{
                type    : String,
                required : true
            } ,
            rating : {
                type : Number,
                required : true,
            },
            comment :  {
                type  :String,
                required : true
            }
        },

    ],

    user:{
        type: mongoose.Schema.ObjectId,
        ref : "User",
        required : true
    },

    createdAt : {
        type : Date,
        default : Date.now
    }

})

module.exports = mongoose.model("Product" , productSchema)         