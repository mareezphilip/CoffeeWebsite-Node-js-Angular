const cartcontroller = require("../coffeeApp/controller/carts.controller")
const {authUser, authAdmin} = require("../coffeeApp/middleware/auth.middleware")
const upload = require("../coffeeApp/middleware/upload.middleware")
const router = require("express").Router()


router.post("/addtocart", authUser, cartcontroller.addcart )

module.exports = router