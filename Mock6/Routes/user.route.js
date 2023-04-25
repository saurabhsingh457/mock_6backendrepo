const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { UserModel } = require("../Models/user.model")

const userRoute = express.Router()

userRoute.get("/", async (req, res) => {
    let user = await UserModel.find()
    console.log(user)
    res.send(user)
})


userRoute.post("/register", async (req, res) => {

    const { name, email, password } = req.body

    const present = await UserModel.findOne({ email })
    if (present) {
        res.send("user with this email already registered")
        console.log("user with this email already present")
    } else {
        bcrypt.hash(password, 5, async (err, hashpass) => {
            if (err) {
                res.send(err)
            } else {
                const user = new UserModel({ name, email, password: hashpass })
                await user.save()
                res.send("registerd successfully")
                console.log(user)

            }
        })
    }
})


userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    // res.send(user.password)
    if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                var token = jwt.sign({ userId: user._id }, "seckey")
                res.send("login successfully")
            } else {
                res.send("wrong credentials")
            }
        })
    } else {
        res.send("email password not matched")
    }

})

module.exports = { userRoute }