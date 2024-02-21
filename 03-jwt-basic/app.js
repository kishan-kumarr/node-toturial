require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const jwtRouter = require("./router/jwt");

//* middleware
app.use(express.json());
app.use("/jwt", jwtRouter);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
