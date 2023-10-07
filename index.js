const express = require("express");
const app = express();
const dotenv = require("dotenv");
const PORT = process.env.PORT || 4000;
dotenv.config();

const connect = require('./config/connect.js');

connect(); 
app.use('/', (req, res) => {
    res.send("Hello from Server side")

})

app.listen(PORT, () => {
    console.log(`Server is Running at PORT ${PORT}`);
});