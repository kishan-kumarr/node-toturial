const express = require("express");
const route = express.Router();
const {
  homePage,
  addUserPage,
  updateUserPage,
} = require("../controller/view_user");

//* loading views
route.get("/", homePage);
route.get("/add_user", addUserPage);
route.get("/update_user", updateUserPage);

module.exports = route;
