const cartModel = require("../../database/models/cart.model")
const fs = require("fs")
const { resGenerator, fileHandler } = require("../helper")
class cart {

  static addcart =async(req,res)=>{
    try{
     
     const oldcart = await cartModel.findOne({userId:req.user._id})

     //res.send(oldcart)
      if(!oldcart){
       console.log("anaa fel !not old cart")
        const cart = new cartModel({userId:req.user._id ,...req.body})
        await cart.save()
        resGenerator(res, 200, true, cart, "added to cart")
      }
    
      else{   
         const productfound = oldcart.products.findIndex(p=> p.productid == req.body.products[0].productid )
         if(productfound != -1 ){
           console.log(productfound)
           oldcart.products[productfound].quantity +=req.body.products[0].quantity
          }
         else{
           //console.log(cart)
           oldcart.products.push((req.body.products[0]))
          }
          await oldcart.save()
          resGenerator(res, 200, true, oldcart, "added to cart")

        
      }
     
    }
  
    catch(e){
     resGenerator(res, 500, false, e.message, "error in insert")
    }

}

    static showAllcarts = async(req,res) =>{
      try {
          const carts = await cartModel.find()
          resGenerator(res, 200, true, carts, "data showed")
      }
      catch (e) {
          resGenerator(res, 500, false, e.message, "error in show data")
      }
    }

    static singleCart = async (req, res) => {
    try {
        const userCart = await cartModel.find( {userId: req.user._id})  // null
        if (!userCart[0])
            resGenerator(res, 200, true, userCart[0], "empty cart")
        resGenerator(res, 200, true, userCart[0], "data showed")
    }
    catch (e) {
        resGenerator(res, 500, false, e, "error in show data")
    }
    }

    static incProductQuantity = async(req,res)=>{
    try{
      const cart = await cartModel.find({userId:req.user._id})
     const productindex = cart[0].products.findIndex(p=> p.productid == req.params.pId )
     if(productindex) {
        cart[0].products[productindex].quantity += 1
        await cart[0].save()
        resGenerator(res, 200, true, cart[0], "quantity updated")
     }
    }
     catch(e){
      resGenerator(res, 500, false, e.message, "error in edit")
     }
    }

    static decProductQuantity = async(req,res)=>{
    try{
      const cart = await cartModel.find({userId:req.user._id})
     const productindex = cart[0].products.findIndex(p=> p.productid == req.params.pId )
     if(productindex) {
        cart[0].products[productindex].quantity -= 1
        await cart[0].save()
        resGenerator(res, 200, true, cart[0], "quantity updated")
     }
    }
     catch(e){
      resGenerator(res, 500, false, e.message, "error in edit")
     }
  }

  static deleteProductCart = async(req,res)=>{
    try{
      const cart = await cartModel.find({userId:req.user._id})
     const productindex = cart[0].products.findIndex(p=> p.productid == req.params.pId )
     if(productindex) {
        cart[0].products.splice(productindex,1)
        await cart[0].save()
        resGenerator(res, 200, true, cart[0], "product deleted")
     }
    }
     catch(e){
      resGenerator(res, 500, false, e.message, "error in delete product")
     }
  }
  static deleteAllProductCart = async(req,res)=>{
    try{
      const cart = await cartModel.find({userId:req.user._id})
      if(cart[0]){
        cart[0].products = []
        await cart[0].save()
        resGenerator(res, 200, true, cart[0], "products deleted")
      }
    }
    catch(e){
      resGenerator(res, 500, false, e.message, "error in delete product")
    }
    }

  }

module.exports=cart
