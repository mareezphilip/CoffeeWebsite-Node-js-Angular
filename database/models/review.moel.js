const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const reviewSchema = mongoose.Schema({ 
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user", 
        required:true
    },
reviewDescription :{
    type:String,
    required:true,
    trim:true
},
rate:{
    type:Number,
    enum:[1,2,3,4,5],
    required:true
}

    
},
{
    timestamps : true  
}
)






const reqviewModel = new mongoose.model("review", reviewSchema)
module.exports = reqviewModel