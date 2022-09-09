const express = require("express");
const { default: mongoose, mongo } = require("mongoose");
const AppError = require("./utils/appError");
const dotenv = require("dotenv").config({ path: "./.env" });
const authRoute = require("./routes/authRoute");
const categoryRoute = require("./routes/categoryRoute");
const produccRoute = require("./routes/productRoute");

const app = express();
app.use(express.json());

//for atlas connecdtion
const mongodbUrl = process.env.MONGODB_ATLAS_SERVER.replace(
  "<password>",
  process.env.MONGODB_ATLAS_SERVER_PASSWORD
);

//connecting to local database
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb atlas connected ");
  })
  .catch((error) => {
    console.log(error);
  });
//route specified
app.use("/user", authRoute);
app.use("/category", categoryRoute);
app.use("/product", produccRoute);

//unhandled routes goes to this middleware
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find the ${req.originalUrl} route `, 400));
});

//error handled middleware
app.use((err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.status = err.status || "error";
  res.status(err.statuscode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
