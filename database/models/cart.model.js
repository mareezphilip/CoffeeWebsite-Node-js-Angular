const mongoose = require("mongoose")


const cartSchema = mongoose.Schema({

    
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user", 
        required:true
    },
    products:[
        {
            productid: {
                type: mongoose.Schema.Types.ObjectId,
                ref:"product", 
                required:true
            },
            quantity:{
                type:Number,
                default:0
            }
        }
    ],



},

{
    timestamps : true  
}
)

/*
userSchema.virtual("myproducts", {
    ref:"product",
    localField: "_id",
    foreignField:"cartid"
})
*/
const cartModel = mongoose.model("cart",cartSchema)
module.exports = cartModel