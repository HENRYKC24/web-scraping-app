const express = require("express");
const { getConferences } = require("../controllers/conferenceController");

const route = express.Router();

route.route("/").get(getConferences);

module.exports = route;
