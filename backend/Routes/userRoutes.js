const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

router.get("/users", userController.getUsers);
router.post("/login", userController.createUser);

module.exports = router;
