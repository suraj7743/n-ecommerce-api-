const express = require("express");
const cors = require("cors");
const { default: mongoose, mongo } = require("mongoose");
const AppError = require("./utils/appError");
const dotenv = require("dotenv").config({ path: "./.env" });
const authRoute = require("./routes/authRoute");
const categoryRoute = require("./routes/categoryRoute");
const produccRoute = require("./routes/productRoute");
const userRoute = require("./routes/UserRoute");
const errorController = require("./controllers/ErrorController");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));

//for atlas connecdtion
const mongodbUrl = process.env.MONGODB_ATLAS_SERVER.replace(
  "<password>",
  process.env.MONGODB_ATLAS_SERVER_PASSWORD
);

//connecting to local database
mongoose
  .connect(process.env.MONGODB_COMPASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb atlas connected ");
  })
  .catch((error) => {
    console.log(error);
  });
console.log(process.env.NODE_ENV);
app.use(morgan("dev"));
//route specified
app.use("/user", authRoute);
//middleware to pass the token if token matched it succed otherwise show error

app.use("/category", categoryRoute);
app.use("/product", produccRoute);
app.use("/users", userRoute);

//unhandled routes goes to this middleware
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find the ${req.originalUrl} route `, 400));
});

//error handled middleware
app.use(errorController);

module.exports = app;
