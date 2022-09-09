const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "must include a product title  "],
    unique: [true, "Title must be unique "],
  },
  description: {
    type: String,
    required: [true, "Must include a description "],
  },
  img: {
    type: String,
    required: [true, "must include a product image  "],
  },
  categories: {
    type: Array,
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "must include a product price   "],
  },
  amount: Number,
  address: {
    type: Object,
    required: [true, "Must include a address "],
  },
  status: {
    type: String,
    default: "pending",
  },
});
orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
orderSchema.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("order", orderSchema);
