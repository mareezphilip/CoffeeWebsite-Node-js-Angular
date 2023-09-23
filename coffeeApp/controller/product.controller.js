const productModel = require("../../database/models/product.model")
const fs = require("fs")
const { resGenerator, fileHandler } = require("../helper")
class product {
    static addproduct = async (req, res) => {
        try {
            console.log(req.file)
            if(!req.file) { throw new Error (" add image ")}
            const ext = req.file.originalname.split('.').pop() // jpeg
            console.log(ext)
            const fileName = req.file.path + "." + ext

            fs.renameSync(req.file.path, fileName)
            const  newName= fileName.replace("public", "")
            //res.send(req.body)
            const product = new productModel({...req.body, images:newName})
            await product.save()
            resGenerator(res, 200, true, product, "data added")


            //console.log(req.body.price)
            // console.log(req.body)
            // console.log(req.file)
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in insert")
        }
    }

    static showAllProducts = async(req,res) =>{
        try {
            const products = await productModel.find()
            resGenerator(res, 200, true, products, "data showed")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in show data")
        }
    }


    static specificCategory = async(req , res) =>{
        try {
            const products = await productModel.find({category:req.params.category})  // null
            if (!products)
                resGenerator(res, 404, false, products, "User not found")
            resGenerator(res, 200, true, products, "data showed")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in show data")
        }
    }

    static deleteproduct = async(req,res)=>{
        
        try{
            await productModel.findByIdAndDelete(req.params.id)
            resGenerator(res, 200, true, null, "product deleted")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in delete")
        }
  
    }


    static editProduct = async(req,res)=>{
        try{
            console.log(req.file)
            if(req.file){
            const ext = req.file.originalname.split('.').pop() // jpeg
            console.log(ext)
            const fileName = req.file.path + "." + ext

            fs.renameSync(req.file.path, fileName)
            const  newName= fileName.replace("public", "")
            await productModel.findByIdAndUpdate(req.params.id ,{...req.body, images:newName}   )
            //res.send(req.body)
            }
            else{
                await productModel.findByIdAndUpdate(req.params.id ,req.body   )
            }
            resGenerator(res, 200, true, null, "product updated")
        }
        catch(e){
            resGenerator(res, 500, false, e.message, "error in update product")
        }
    }
   





    static showSingleProduct = async (req, res) => {
        try {
            const product = await productModel.findById(req.params.id)  // null
            if (!product)
                resGenerator(res, 404, false, product, "product not found")
            resGenerator(res, 200, true, product, "produced showed")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in show product")
        }
    }


    static searchByName = async(req , res) =>{
        try{
            
            const products = await productModel.find({"title" : { "$regex": req.params.searchKey, "$options": "i" }})
            resGenerator(res, 200, true, products, "produced showed")

        }
        catch{
            resGenerator(res, 500, false, e.message, "error in show product")
        }
    }




    /*
    static uploadImage = async(req, res) => {
        try{
            const newName = fileHandler(req)
            req.user.image = newName.replace("public", "")
            await req.user.save()
            resGenerator(res, 200, true, req.user, "img uploaded")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in upload")
        }
    }
    */
}

module.exports = product