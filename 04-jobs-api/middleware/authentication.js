const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer")) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ status: 0, msg: "Token expired please try again" });
    }

    const token = authorization.split(" ")[1];

    const user = jwt.verify(token, process.env.JWT_SECRET, token);
    req.user = user;
    next();
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ status: 0, msg: "invalid token" });
  }
};

module.exports = auth;
