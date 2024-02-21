const express = require("express");
const route = express.Router();
const dashboard = require("../controller/dashboard");
const {
  verifyToken,
  regenerateRefreshToken,
} = require("../controller/generateJwtToken");

route.get("/", verifyToken, dashboard);
route.post("/refresh-token", regenerateRefreshToken);

module.exports = route;
