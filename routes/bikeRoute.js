const express = require('express');
const router = express.Router();
const Bike = require('../models/bikeModels');

router.get('/getallbikes', async(req, res) => {
    try {
        const bike = await Bike.find();
        res.send(bike);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/addbike', async(req, res) => {
    try {
        const newbike = new Bike(req.body);
        await newbike.save();
        res.send('Bike added successfully');
    } catch (err) {
        res.status(400).json(err);
    }
})

router.post('/editbike', async(req, res) => {
    try {
       const bike=await Bike.findOne({_id:req.body._id});
       bike.name=req.body.name;
       bike.image=req.body.image;
       bike.capacity=req.body.capacity;
       bike.fuelType=req.body.fuelType;
       bike.rentPerHour=req.body.rentPerHour;
       await bike.save();
        res.send('Bike details updated successfully');
    } catch (err) {
        res.status(400).json(err);
    }
})

router.post('/deletebike', async(req, res) => {
    try {
        const deletedBike = await Bike.findOneAndDelete({ _id: req.body._id });
        if (!deletedBike) {
            return res.status(404).send('Bike not found');
        }
        res.send('Bike deleted successfully');
    } catch (err) {
        res.status(400).json(err);
    }
})



module.exports = router;