require("dotenv").config();
require("./db/conn");
const Product = require("./models/product-model");
const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
