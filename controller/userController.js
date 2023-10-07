const User = require("../models/userModel.js");

const createUser = async(req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne(email);
    if (!findUser) {
        // Craete new user
        const newUser = User.create(req.body);
        res.json(newUser);
    } else {
        res.json({
            msg: "User Already Exists",
            success: false,
        });
    }
};

module.exports ={
    createUser
}