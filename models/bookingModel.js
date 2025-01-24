const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({


      bike : {type : mongoose.Schema.Types.ObjectID , ref:'Bike'},
      user : {type : mongoose.Schema.Types.ObjectID , ref:'users'},
      bookedTimeSlots : {
          from : {type : String} ,
          to : {type : String}
      } ,
      totalhrs : {type : Number},
      totalcost : {type : Number},
      transactionId : {type : String},
},
  {timestamps : true}
)

const bookingModel = mongoose.model('bookings' , bookingSchema)

module.exports = bookingModel