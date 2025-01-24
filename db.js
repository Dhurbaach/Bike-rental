const mongoose = require("mongoose");

function connectDB() {
    mongoose.connect("mongodb://localhost:27017/BikeRental", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.error("MongoDB connection error:", err);
        });

    const connection = mongoose.connection;
    connection.on("error", (err) => {
        console.error("MongoDB runtime error:", err);
    });
}

connectDB();

module.exports = mongoose;
