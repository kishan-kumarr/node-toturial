const express = require("express");
const route = express.Router();
const {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/store-controller");

route.get("/", getProduct);
route.post("/", createProduct);
route.patch("/:id", updateProduct);
route.delete("/:id", deleteProduct);

module.exports = route;
