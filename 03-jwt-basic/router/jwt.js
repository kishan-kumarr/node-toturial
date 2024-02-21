const express = require("express");
const router = express.Router();
const { getDashboard, doLogin } = require("../controller/jwt");

router.get("/dashboard/:token", getDashboard);
router.post("/login", doLogin);

module.exports = router;
