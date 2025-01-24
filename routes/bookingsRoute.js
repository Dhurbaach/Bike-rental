const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Bike = require("../models/bikeModels");
// const { v4: uuidv4 } = require("uuid");
// const stripe = require("stripe")(
//   "sk_test_51NFtVGSAZAXtdYSkBaDemNewFODLyLvAZ4Cp8oCxI2m1ecvfG2C1cNpm1B6k6lwIQfD2f9Hxt53gG2hNGExnFVK100raNTKWo4"
// );

router.post("/bookBike", async (req, res) => {
  req.body.transactionId = '1234';//payment.source.id;
  try {
      const newbooking = new Booking(req.body);
      await newbooking.save();
      const bike = await Bike.findOne({ _id: req.body.bike});
      if (!bike) {
        throw new Error("Bike not found");
      }
  
      bike.bookedTimeSlots.push(req.body.bookedTimeSlots);
      await bike.save();
      res.send("Your booking is successfull");
    // } else {
    //   return res.status(400).json(error);
    // }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});


router.get("/getallbookings", async(req, res) => {

    try {

        const bookings = await Booking.find().populate("bike");
        res.send(bookings)
        
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(400).json({ error: "Failed to fetch bookings" });
    }
  
});


module.exports = router;