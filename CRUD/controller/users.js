const { StatusCodes } = require("http-status-codes");
const User = require("../model/users");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    if (!users)
      res
        .status(StatusCodes.NOT_FOUND)
        .send({ msg: "All fields are required" });

    res
      .status(StatusCodes.OK)
      .send({ data: users, numberOfRecord: users.length });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: error || "something went wrong with fetching users" });
  }
};

const getSingleUser = async (req, res) => {
  const _id = req.params.id;

  if (!_id)
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: error || "user id not provided" });

  try {
    const user = await User.findById(_id);

    if (!user)
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ msg: `Data not found of this id: ${_id}` });

    res.status(StatusCodes.OK).send({ data: user });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: error || "something went wrong in user" });
  }
};

const createUser = async (req, res) => {
  const { name, email, gender } = req.body;

  if (!name || !email || !gender)
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: "All fields are required" });

  try {
    const user = await User.create(req.body);
    if (!user)
      res.status(StatusCodes.BAD_REQUEST).send({ msg: "User not created" });

    //res.status(StatusCodes.ACCEPTED).send({ user });
    res.render("add_user");
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: error || "something went wrong in user" });
  }
};

const updateUser = async (req, res) => {
  const _id = req.params.id;

  if (!_id)
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: error || "user id not provided" });

  try {
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user)
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ msg: `Data not found of this id: ${_id}` });

    res.status(StatusCodes.OK).send({ data: user });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: error || "something went wrong in user" });
  }
};

const deleteUser = async (req, res) => {
  const _id = req.params.id;

  if (!_id)
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: error || "user id not provided" });

  try {
    const user = await User.findByIdAndDelete(_id);

    if (!user)
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ msg: `Data not found of this id: ${_id}` });

    res.status(StatusCodes.OK).send({ data: user });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: error || "something went wrong in user" });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
