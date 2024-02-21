const { StatusCodes } = require("http-status-codes");
const User = require("../model/user.model");
const { jwtAccessToken, jwtRefreshToken } = require("./generateJwtToken");
const userRegister = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ msg: "Email and Password is required" });

    const isExist = await User.findOne({ email });
    if (isExist)
      return res
        .status(StatusCodes.CONFLICT)
        .send({ msg: `${email} is already register with us` });

    const user = await User.create({ email, password });

    //* generating access token
    const accessToken = jwtAccessToken(user._id);

    //* generating access token
    const refreshToken = jwtRefreshToken(user._id);

    res
      .status(StatusCodes.CREATED)
      .send({ data: user, accessToken, refreshToken });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: error || "Something went wrong, user can not created" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ msg: "Email and Password is required" });

    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ msg: "Invalid Cridentials" });

    const isMatch = await user.isVarifyPassword(password);

    if (!isMatch)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ msg: "Invalid Cridentials" });

    //* generating access token
    const accessToken = jwtAccessToken(user._id);

    //* generating access token
    const refreshToken = jwtRefreshToken(user._id);

    res
      .status(StatusCodes.OK)
      .send({ data: user, msg: "Logged In", accessToken, refreshToken });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: error || "Something went wrong, user can not created" });
  }
};

module.exports = { userRegister, userLogin };
