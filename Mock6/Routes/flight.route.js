const express = require('express')
const { FlightModel } = require("../Models/flight.model")

const flightRoute = express.Router()

flightRoute.get("/get/flights", async (req, res) => {

    let flight = await FlightModel.find()
    console.log(flight)
    res.send(flight)
})



flightRoute.get("/get/flights/:id", async (req, res) => {
    const ID = req.params.id
    let flight = await FlightModel.findOne({ _id: ID })
    console.log(flight)
    res.send(flight)
})


flightRoute.post("/post/flights", async (req, res) => {
    const data = req.body
    try {
        let flight = await FlightModel.insertMany(data)
        console.log("flight added successfully")
        res.send(flight)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

flightRoute.patch("/patch/flights/:id", async (req, res) => {
    const ID = req.params.id
    const data = req.body
    let flight = await FlightModel.findByIdAndUpdate({ _id: ID }, data)
    console.log(flight)
    res.send(flight)
})


flightRoute.delete("/delete/flights/:id", async (req, res) => {
    const ID = req.params.id
    const data = req.body
    let flight = await FlightModel.findByIdAndDelete({ _id: ID })
    console.log(flight)
    res.send(flight)
})


module.exports = { flightRoute }