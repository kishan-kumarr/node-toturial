var jwt = require("jsonwebtoken");

const getDashboard = (req, res) => {
  const { token } = req.params;
  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    const luckyNumber = Math.floor(Math.random() * 100);
    const msg = `Hi, ${decodeToken.username} Today Your lucky Number is ${luckyNumber}`;

    res.status(200).send({ msg });
  } catch (error) {
    res.status(404).send({ error });
  }
};

const doLogin = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401).send({ msg: "Username or Password are required" });
  } else {
    const id = new Date().getDate();
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res
      .status(200)
      .send({ id, username, msg: "Logged in successfully done", token });
  }
};

module.exports = { getDashboard, doLogin };
