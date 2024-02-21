const mongoose = require("mongoose");
const mongoUrl = process.env.DB_URL;
console.log(mongoUrl);
mongoose
  .connect(mongoUrl)
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));
