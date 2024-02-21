const User = require("../model/users");
const axios = require("axios");

const homePage = async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5000/api/users");

    res.render("index", {
      res: response.data,
    });
  } catch (error) {
    throw new Error("something went wrong with get all data");
  }
};

const addUserPage = (req, res) => {
  res.render("add_user");
};

const updateUserPage = async (req, res) => {
  const _id = req.query.id;
  const user = await axios.get(`http://localhost:5000/api/users/${_id}`);
  // console.log(user);
  res.render("update_user", { user });
};

module.exports = { homePage, addUserPage, updateUserPage };
