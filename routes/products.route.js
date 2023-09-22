const productcontroller = require("../coffeeApp/controller/product.controller")
const {authUser, authAdmin} = require("../coffeeApp/middleware/auth.middleware")
const upload = require("../coffeeApp/middleware/upload.middleware")
const router = require("express").Router()


router.post("/addProduct" , authUser ,authAdmin , upload.single("image") , productcontroller.addproduct )
router.get("/allProduct" , productcontroller.showAllProducts )

router.get("/specificCategory/:category" , productcontroller.specificCategory)


module.exports = router