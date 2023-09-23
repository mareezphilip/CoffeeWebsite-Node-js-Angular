const productcontroller = require("../coffeeApp/controller/product.controller")
const {authUser, authAdmin} = require("../coffeeApp/middleware/auth.middleware")
const upload = require("../coffeeApp/middleware/upload.middleware")
const router = require("express").Router()


router.post("/addProduct" , authUser ,authAdmin , upload.single("image") , productcontroller.addproduct )
router.get("/allProduct" , productcontroller.showAllProducts )
router.get("/showSingleProduct/:id" , productcontroller.showSingleProduct)
router.get("/search/:searchKey" , productcontroller.searchByName)

router.get("/specificCategory/:category" , productcontroller.specificCategory)

router.delete("/deleteProduct/:id" ,authUser ,authAdmin  ,productcontroller.deleteproduct)



router.patch("/editProduct/:id" ,authUser ,authAdmin ,upload.single("image") ,productcontroller.editProduct)


module.exports = router