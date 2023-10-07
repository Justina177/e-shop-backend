const express = require("express");
const dotenv = ("dotenv").config();
const PORT = process.env.PORT || 4000;

const app = express();

app.listen(PORT, () => {
    console.log(`Server is Running at PORT ${PORT}`);
});