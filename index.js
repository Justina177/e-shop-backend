const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 4000;
dotenv.config();
const connect = require('./config/connect.js');
const authRouter =require("./routes/authRoute.js");
const { notFound, errorHandler } = require("./middlewares/errorHandler.js");
const cookieParser = require("cookie-parser");
// const ProductRouter = require("./routes/productRoute.js");
const productRouter = require("./routes/productRoute");
connect(); 
// 48.20

// app.use('/', (req, res) => {
//     res.send("Hello from Server side")
// });
app.use(bodyParser.json());
app.use(bodyParser .urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user', authRouter);
app.use('/api/product', productRouter);

app.use(notFound);
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is Running at PORT ${PORT}`);
});