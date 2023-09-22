const express = require("express")
const app = express()
const path = require("path")
//const cors = require("cors")

//app.use(cors())

app.use(express.static(path.join(__dirname, "../public")))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const userRoutes = require(".././routes/user.route")
app.use("/users",userRoutes)
const productRoutes = require("../routes/products.route")
app.use("/products",productRoutes)

module.exports = app