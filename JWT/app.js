const express = require("express");
const app = express();
require("dotenv").config();
require("./database/dbConn");
const userRoute = require("./router/user.router");
const userDashboard = require("./router/dashboard");
const port = process.env.PORT || 3000;
const morgan = require("morgan");

morgan("tiny");

//* middleware
// handling when client send json data
app.use(express.json());
//* handling when client send form data encoded
app.use(express.urlencoded({ extended: true }));

//* router middleware
app.use(userDashboard);
app.use("/api", userRoute);

// //* Handling 404 request
app.use((req, res, next) => {
  let error;
  error.status = 404;
  error.msg = "File not found";
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 404).send({
    error: { status: err.status || 404, msg: err.msg || "File not found" },
  });
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
