const userModel = require("../../database/models/user.model")
const { resGenerator, fileHandler } = require("../helper")
class User {
    static adduser = async (req, res) => {
        try {
            const userData = new userModel ({...req.body, userType:"user"})
            await userData.save()
            resGenerator(res, 200, true, userData, "data added")
        }
        catch (e) {
            resGenerator(res, 500, false, e, "error in insert")
        }
    }



    static addAdmin = async (req, res) => {
        try {
            const userData = new userModel({...req.body, userType:"admin"})
            await userData.save()
            resGenerator(res, 200, true, userData, "data added")
        }
        catch (e) {
            resGenerator(res, 500, false, e, "error in insert")
        }
    }
 

    static showSingle = async (req, res) => {
        try {
            const userData = await userModel.findById(req.params.id)  // null
            if (!userData)
                resGenerator(res, 404, false, userData, "User not found")
            resGenerator(res, 200, true, userData, "data showed")
        }
        catch (e) {
            resGenerator(res, 500, false, e, "error in show data")
        }
    }
   
    static editSingle = async (req, res) => {
        try {
            const allowedEdits = ["fName", "lName", "phone" ," dOfBirth"]
            const icomingReqHeaders = Object.keys(req.body)
            //every
            const result = icomingReqHeaders.every((head) => {
                return allowedEdits.includes(head)
            })
            if (!result)
                resGenerator(res, 404, false, null, "invalid updates")
            const userData = await userModel.findByIdAndUpdate(req.user._id, req.body, { runValidators: true })
            // const userData = await userModel.findById(req.params.id)
            // icomingReqHeaders.forEach(el=> userData[el]= req.body[el])
            // await userData.save()
            if (!userData)
                resGenerator(res, 404, false, userData, "User not found")
            resGenerator(res, 200, true, userData, "data showed")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in show data")
        }

    }

    static login = async (req, res) => {
        try {
            const userData = await userModel.logMe(req.body.email, req.body.password)
            const token = await userData.generateToken()
            resGenerator(res, 200, true, {userData, token}, "data showed")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in show data")
        }
    }

    static myProfile = async(req,res)=>{
        resGenerator(res, 200, true, {user: req.user, token: req.token}, "data showed")
    }
    static logOut = async(req,res)=> {
        try{
            req.user.tokens = req.user.tokens.filter(t => t.token != req.token)
            await req.user.save()
            resGenerator(res, 200, true, null, "logged out")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in show data")
        }
    }
 

    
    // static editProfile = async(req,res)=>{
    //     try{
    //         if(req.body.password) delete req.body.password
    //        // res.send("test")
    //        res.send(req.body)
    //         await findByIdAndUpdate(req.user._id, req.body, {runValidators:true})
    //         resGenerator(res, 200, true, null, "edit done")
    //     }
    //     catch (e) {
    //         resGenerator(res, 500, false, e.message, "error in edit")
    //     }
    // }

    static addAddress = async(req, res)=>{
        try{
            if(req.user.addresses.length>10) throw new Error("you exceeded")
            req.user.addresses.push(req.body)
            await req.user.save()
            resGenerator(res, 200, true, req.user, "logged out")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in show data")
        }
    }

    static delAddress = async(req,res)=>{
        try{
            req.user.addresses = req.user.addresses.filter(addr=> addr._id != req.params.id)
            await req.user.save()
            resGenerator(res, 200, true, null, "logged out")
    }
    catch (e) {
        resGenerator(res, 500, false, e.message, "error in show data")
    }
    }



      
    static changepassword = async (req, res) => {
        try {
            const allowedEdits = ["password"]
            const icomingReqHeaders = Object.keys(req.body)
            //every
            const result = icomingReqHeaders.every((head) => {
                return allowedEdits.includes(head)
            })
            if (!result)
                resGenerator(res, 404, false, null, "invalid updates")
            //const userData = await userModel.findByIdAndUpdate(req.user._id, req.body, { runValidators: true })

             const userData = await userModel.findById(req.user._id)
             icomingReqHeaders.forEach(el=> userData[el]= req.body[el])
             await userData.save()
            if (!userData)
                resGenerator(res, 404, false, userData, "User not found")
            resGenerator(res, 200, true, userData, "passwordchanged")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in change password")
        }

    }

}
module.exports = User