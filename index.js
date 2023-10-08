const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 4000;
dotenv.config();
const connect = require('./config/connect.js');
const authRouter =require("./routes/authRoute.js");
const { notFound, errorHandler } = require("./middlewares/errorHandler.js");

connect(); 

// app.use('/', (req, res) => {
//     res.send("Hello from Server side")
// });
app.use(bodyParser.json());
app.use(bodyParser .urlencoded({ extended: true }));
app.use('/api/user', authRouter);

app.use(notFound);
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is Running at PORT ${PORT}`);
});