const express = require("express");
const router = express();
const userController = require("../controllers/userController");

router.get("/", userController.getAlluser);
router.get("/:id", userController.getSingleUser);

module.exports = router;
