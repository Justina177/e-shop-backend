const express = require("express");
const app = express();
const dotenv = require("dotenv");
const PORT = process.env.PORT || 4000;
dotenv.config();
const connect = require('./config/connect.js');
const authRouter =require("./routes/authRoute.js")

connect(); 

// app.use('/', (req, res) => {
//     res.send("Hello from Server side")
// });
app.use(express.json());
// app.use(bodyParser.urlencoded({ extend: true }));
app.use('/api/user', authRouter);

app.listen(PORT, () => {
    console.log(`Server is Running at PORT ${PORT}`);
});