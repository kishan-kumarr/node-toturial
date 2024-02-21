const mongoose = require("mongoose");
const mongoUrl = process.env.MONGO_URL;

mongoose
  .connect(mongoUrl)
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));
