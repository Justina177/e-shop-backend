const User =require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken.js");
const validateMongoDbId = require("../utils/validateMongodbId.js");
const { generateRefreshToken } = require("../config/refreshToken.js");


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
    if(findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateuser = await User.findByIdAndUpdate(
            findUser.id,
            {
               refreshToken: refreshToken,
            },
            { new: true }
        );
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
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

const getAllUsers = asyncHandler(async(req, res) =>{
    try {
        const getUsers = await User.find();
        res.status(200).json(getUsers);
    } catch (err) {
        throw new Error(err);
    }
});

// Get a Single User
const getUser = asyncHandler(async(req, res) =>{
    const { id } = req.params;
    validateMongoDbId(id);
    
    try {
        const getUser = await User.findById( id );
        res.status(200).json({ 
            getUser,
        });
    } catch (error) {
        throw new Error(error);
    }
});

// Delete a single User 
const deleteUser = asyncHandler(async (req, res) => {
    // console.log(req.params);
    const { id } =req.params;
    validateMongoDbId(id);

    try {
        const deleteuser = await User.findByIdAndDelete(id);
        res.status(200).json({
            message: "User deleted successfully", 
            deleteuser,
        });
    } catch (err) {
        throw new Error(err);
    }
});

// Update a User
const updateUser = asyncHandler(async (req, res) => {
    // console.log()
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {
        const updateUser = await User.findByIdAndUpdate(
            _id,
            {
                firstname: req?.body?.firstname,
                lastname: req?.body.lastname,
                email: req.body?.email,
                mobile: req?.body.mobile,
            },
            {
                new: true,
            }
            );
            res.status(200).json({
                message:"User details updated successfully",
                updateUser
            });
    } catch (error) {
        throw new Error(error);
    }

});

const blockUser = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const blockusr = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: true,
            },
            {
                new: true,
            }
        );
        res.status(200).json({
            message: "User Blocked", blockusr

        })

    } catch (error) {
        throw new Error(error);
    }

});

const unblockUser = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const blockusr = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: false,
            },
            {
                new: true,
            }
        );
        res.status(200).json({
            message: "User Unblocked", blockusr
        })

    } catch (error) {
        throw new Error(error);
    }

});




module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    blockUser,
    unblockUser,
 
}