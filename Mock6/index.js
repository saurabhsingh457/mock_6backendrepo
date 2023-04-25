const express = require('express')

const app = express()

const { connection } = require("./config/db")
const cors = require("cors")
app.use(cors({ origin: "*" }))

app.use(express.json())



const { userRoute } = require("./Routes/user.route")
app.use("/user", userRoute)

const { flightRoute } = require("./Routes/flight.route")
app.use("/", flightRoute)

const {bookingRouter}=require("./Routes/booking.route")
app.use("/booking", bookingRouter)


app.listen(3500, async () => {

    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
    console.log("server running on port 3500")

})









