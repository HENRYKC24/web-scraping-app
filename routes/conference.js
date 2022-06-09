const express = require("express");
const { getConferences } = require("../controllers/conferenceController");

const route = express.Router();

route.route("/conferences").get(getConferences);

module.exports = route;
