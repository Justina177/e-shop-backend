const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async(req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        // Craete new user
        const newUser = await User.create(req.body);
        res.status(201).json({ message: "User Created Succefully", newUser});
    } else {
        res.json({
            msg: "User Already Exists",
            success: false,
        });
    }
});

const loginUser =asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
})

module.exports = {
    createUser,
    loginUser
}