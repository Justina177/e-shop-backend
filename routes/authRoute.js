const express = require("express");
const router = express.Router();
const { createUser, loginUser, getAllUser } = require("../controller/userController.js")

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", getAllUser)


module.exports = router;