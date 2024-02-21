const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const product = require("./router/store-router");
require("./db/conn");


//* node middleware
app.use(express.json());
app.use("/api/product", product);


app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
