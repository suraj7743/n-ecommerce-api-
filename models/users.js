const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "must include a username "],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Must include a Email "],
      unique: [true, "Must include a unique Email"],
    },
    password: {
      type: String,
      required: [true, "must include a passowrd "],
    },
    is_admin: {
      default: false,
    },
    resetToken: {
      type: String,
    },
    resetTokenExpiresIn: Date,
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.generateToken = function () {
  const resetToken = crypto.randomBytes(3).toString("hex");
  this.resetToken = resetToken;
  this.resetTokenExpiresIn = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
userSchema.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("user", userSchema);
