const express = require("express");
const { getEvents } = require("../controllers/eventsController");

const route = express.Router();

route.route("/").get(getEvents);

module.exports = route;
