const cartcontroller = require("../coffeeApp/controller/carts.controller")
const {authUser, authAdmin} = require("../coffeeApp/middleware/auth.middleware")
const upload = require("../coffeeApp/middleware/upload.middleware")
const router = require("express").Router()


router.post("/addtocart", authUser, cartcontroller.addcart )
router.get("/allCarts" ,authUser , authAdmin , cartcontroller.showAllcarts )
router.get("/userCart" ,authUser , cartcontroller.singleCart )
router.patch("/incProductQuantity/:pId",authUser ,cartcontroller.incProductQuantity)
router.patch("/decProductQuantity/:pId",authUser ,cartcontroller.decProductQuantity)
router.delete("/deleteProductCart/:pId" , authUser  , cartcontroller.deleteProductCart)
router.delete("/deleteAllProductCart" , authUser  , cartcontroller.deleteAllProductCart)

module.exports = router