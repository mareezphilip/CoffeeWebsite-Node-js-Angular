const reviewcontroller = require("../coffeeApp/controller/review.controller")
const {authUser, authAdmin} = require("../coffeeApp/middleware/auth.middleware")
const upload = require("../coffeeApp/middleware/upload.middleware")
const router = require("express").Router()


router.post("/addReview" ,authUser   ,reviewcontroller.addReview)
router.get("/allReview"    ,reviewcontroller.showAllReviews)
router.patch("/editMyReview"    ,authUser,reviewcontroller.editMyReview)
router.get("/singleReview",authUser,reviewcontroller.singleReview)



module.exports = router