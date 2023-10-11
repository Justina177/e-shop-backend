const express = require("express");
const router = express.Router();
const { createUser, loginUser, getAllUsers, getUser } = require("../controller/userController.js")

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", getAllUsers);
router.get("/:id", getUser)


module.exports = router;