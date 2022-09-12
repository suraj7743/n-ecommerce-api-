const express = require("express");
const router = express();

//importing auth controller
const authController = require("../controllers/authController");
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/forgetPassword", authController.forgetpassword);
router.post("/resetPassword/:token", authController.resetPassword);

//exporting router
module.exports = router;
