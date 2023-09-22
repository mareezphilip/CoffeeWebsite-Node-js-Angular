

const mongoose = require("mongoose")


const productSchema = mongoose.Schema({

    
    
  title:{
    type:String,
    trim:true,
    required:true
  },
  price:{
    type:Number,
    required:true

  },
  description:{
    type:String,
    trim:true,
    
  },
  images:{
    type:String,
    trim:true
  },
  category:{
    type:String,
    enum:["tea" , "hot Coffee" , "ice coffee" , "fresh drinks" , "Frappuccino"]
    
  }



}

)


productSchema.virtual("myproducts", {
    ref:"cart",
    localField: "_id",
    foreignField:"products.productid"
})


const productModel = mongoose.model("product",productSchema)
module.exports = productModel