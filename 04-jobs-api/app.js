require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const port = process.env.PORT || 5000;
const userRouter = require("./router/user");
const auth = require("./middleware/authentication");
const jobsRouter = require("./router/jobs");

app.use(express.json());
app.use("/api", userRouter);
app.use("/jobs", auth, jobsRouter);

app.listen(port, () => console.log(`Server listing on ${port}`));
