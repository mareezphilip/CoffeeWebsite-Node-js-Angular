const productModel = require("../../database/models/product.model")
const fs = require("fs")
const { resGenerator, fileHandler } = require("../helper")
class product {
    static addproduct = async (req, res) => {
        try {
            console.log(req.file)
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