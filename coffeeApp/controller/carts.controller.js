const cartModel = require("../../database/models/cart.model")
const fs = require("fs")
const { resGenerator, fileHandler } = require("../helper")
class cart {

    static addcart =async(req,res)=>{
        try{
         console.log("anaaaa fe addd to cart")   
         const oldcart = await cartModel.findOne({userId:req.user._id})
         if(!oldcart){
           const cart = new cartModel({userId:req.user._id ,...req.body})
           await cart.save()
           resGenerator(res, 200, true, cart, "added to cart")
         }
         else{   
             const cart = await cartModel.find({userId: req.user._id})
             console.log(cart)
             cart[0].products.push((req.body.products[0]))
             await cart[0].save()
             resGenerator(res, 200, true, cart[0], "added to cart")
         }
         
        }
        catch(e){
         resGenerator(res, 500, false, e.message, "error in insert")
        }
 
     }

}
module.exports=cart
