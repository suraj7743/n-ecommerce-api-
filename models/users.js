const mongoose = require("mongoose");
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
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
userSchema.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("user", userSchema);
