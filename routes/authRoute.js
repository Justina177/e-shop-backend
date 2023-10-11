const express = require("express");
const router = express.Router();
const { createUser, loginUser, getAllUsers, getUser, deleteUser, updateUser } = require("../controller/userController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", getAllUsers);
router.get("/:id",authMiddleware, getUser)
router.delete("/:id", deleteUser);
router.put("/:id", updateUser)


module.exports = router;