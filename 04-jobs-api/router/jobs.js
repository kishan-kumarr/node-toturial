const express = require("express");
const route = express.Router();
const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controller/jobs");

route.get("/", getAllJobs);
route.get("/:id", getJob);
route.post("/", createJob);
route.patch("/:id", updateJob);
route.delete("/:id", deleteJob);

module.exports = route;
