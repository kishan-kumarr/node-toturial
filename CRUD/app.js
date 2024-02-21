const express = require("express");
const app = express();
require("dotenv").config();
const userRouter = require("./routes/users");
const viewRouter = require("./routes/load_view");
const { StatusCodes } = require("http-status-codes");
require("./database/conn");
const path = require("path");
const morgan = require("morgan");

// use morgan "middleware"
app.use(morgan("tiny"));

const port = process.env.PORT || 5000;

//* middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* set the view engine to ejs
app.set("view engine", "ejs");

//* route middleware
app.use("/api/users", userRouter);
app.use("/", viewRouter);

//* set static files
app.use("/css", express.static(path.join(__dirname, "assets", "css")));
app.use("/js", express.static(path.join(__dirname, "assets", "js")));

//* handle 404 request
app.use((req, res, next) => {
  res.status(StatusCodes.NOT_FOUND || 404).send({
    error: {
      status: StatusCodes.NOT_FOUND || 404,
      message: "File not found",
    },
  });
  next();
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
