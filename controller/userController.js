const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
const { generateToken } =require("../config/jwtToken.js")
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

const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    // console.log(email, password);
         // Check if user exists or not
    const findUser = await User.findOne({ email });
    if(findUser && await findUser.isPasswordMatched(password)) {
        res.status(200).json({
            _id: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        });
    } else {
        throw new Error("Invalid credenentials");
    }
});

// Get All Users
const getAllUser = asyncHandler(async(req, res) =>{
    try {
        const getUsers = await User.find();
        res.status(200).json(getUsers);
    } catch (err) {
        throw new Error(err);
    }
});

module.exports = {
    createUser,
    loginUser,
    getAllUser
}