const User = require("../model/user");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ msg: "All fields are required" });

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(StatusCodes.CREATED).send({ user });
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).send(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ status: 0, msg: "Email and Password field is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ status: 0, msg: "Invailid cridentials" });
    }

    const isPassMatch = await user.isPasswrodVerify(password);
    if (!isPassMatch) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ status: 0, msg: "Invailid cridentials" });
    }

    const token = user.createJWT();

    res
      .status(StatusCodes.OK)
      .send({ status: 1, msg: "Login successfully done", data: user, token });
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).send({ status: 0, msg: error });
  }
};

module.exports = { register, login };
