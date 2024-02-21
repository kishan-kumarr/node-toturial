const express = require("express")
const app = express()
const api = require('../controller/api')

const route = express.Router();



route.get('/', api)

module.exports = route;