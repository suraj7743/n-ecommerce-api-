const express = require("express");
const router = express();

//importing auth controller
const authController = require("../controllers/authController");
router.post("/register", authController.registerUser);

//exporting router
module.exports = router;
