const express = require('express')
const app = express()
const bodyParser=require('body-parser');
const port = process.env.PORT || 5000
const dbconnection=require('./db');
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/users',require('./routes/usersRoute'));
app.use('/api/bikes',require('./routes/bikeRoute'));
app.use('/api/bookings',require('./routes/bookingsRoute'));
app.get('/',(req,res)=>{
    res.send('Welcome to the bike rental API');
});

app.listen(port,()=>console.log(`Listening on port: ${port}`));
