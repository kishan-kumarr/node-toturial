const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const dashboard = (req, res) => {
  res.send({ msg: `Hi welcome to dashboard ${req.payload.userId}` });
};

module.exports = dashboard;
