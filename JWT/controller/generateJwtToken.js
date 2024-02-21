const jwt = require("jsonwebtoken");

const jwtAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "20s",
  });
};

const jwtRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "1y",
  });
};

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    error.status = StatusCodes.UNAUTHORIZED;
    error.msg = "you are unauthorize to access this page";
    next(error);
  }

  const headerToken = authorization.split(" ")[1];

  const isAuthrize = jwt.verify(headerToken, process.env.JWT_ACCESS_SECRET);

  if (!isAuthrize) {
    error.status = StatusCodes.UNAUTHORIZED;
    error.msg = "you are unauthorize to access this page";
    next(error);
  }

  req.payload = isAuthrize;
  next();
};

const regenerateRefreshToken = (req, res) => {
  const { authorization } = req.body;

  if (!authorization)
    res.send({ msg: "you are unauthorize to access this page" });

  const isTokenVarify = jwt.verify(
    authorization,
    process.env.JWT_REFRESH_SECRET
  );

  if (!isTokenVarify)
    res.send({ msg: "you are unauthorize to access this page" });

  //* generating again fresh(new) both tokens
  //* generating access token
  const accessToken = jwtAccessToken(isTokenVarify.userId);

  //* generating access token
  const refreshToken = jwtRefreshToken(isTokenVarify.userId);
  res.send({ accessToken, refreshToken });
};

module.exports = {
  jwtAccessToken,
  jwtRefreshToken,
  verifyToken,
  regenerateRefreshToken,
};
