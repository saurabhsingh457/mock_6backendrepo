const express = require('express')

// const {BookingModel}=require("../Models/booking.model")
const { UserModel } = require("../Models/user.model")
const { FlightModel } = require("../Models/flight.model")

const bookingRouter = express.Router()

let arr = []
bookingRouter.get("/", async (req, res) => {

    const user = await UserModel.findOne()
    const booking = await FlightModel.findOne()
    let obj = {
        "name": user.name,
        "email": user.email,
        "airline": booking.airline,
        "flightNo": booking.flightNo,
        "departure": booking.departure,
        "arrival": booking.arrival,
        "departureTime": booking.departureTime,
        "arrivalTime": booking.arrivalTime,
        "seats": booking.seats,
        "price": booking.price


    }
    arr.push(obj)
    // booking.name=user.name
    // booking.email=user.email
    console.log("booking")
    res.send(booking)
})

bookingRouter.get("/dashboard",(req,res)=>{
    res.send(arr)
})



module.exports = { bookingRouter }