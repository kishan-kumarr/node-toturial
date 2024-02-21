const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    required: [true, "product name must be provided"],
    type: String,
  },
  price: {
    require: [true, "product price must be provided"],
    type: Number,
  },
  feature: {
    defalut: false,
    type: Boolean,
  },
  rating: {
    type: String,
    default: "4.5",
  },
  company: {
    type: String,
    enum: {
      values: ["node", "react", "mongo", "express"],
    },
  },
  createdAt: {
    default: Date.now(),
    type: Date,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
