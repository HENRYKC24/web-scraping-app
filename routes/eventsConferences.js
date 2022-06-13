const express = require("express");
const { getEventsConferences } = require("../controllers/getEventsConferences");

const router = express.Router();

router.route("/").get(getEventsConferences);

module.exports = router;
