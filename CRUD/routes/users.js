const express = require("express");
const route = express.Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/users");

//* api
route.get("/", getAllUsers);
route.get("/:id", getSingleUser);
route.post("/", createUser);
route.patch("/:id", updateUser);
route.delete("/:id", deleteUser);

module.exports = route;
