const express = require("express");
const eventsConferencesRoute = require("./routes/eventsConferences");

const app = express();

app.use("/api/v1/events-conferences", eventsConferencesRoute);

module.exports = app;
