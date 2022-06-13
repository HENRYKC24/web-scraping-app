const mongoose = require("mongoose");

const eventsConferencesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An event/conference must have a name"],
    unique: false,
  },
  date: {
    type: String,
    required: [true, "An event/conference must have a date"],
    unique: false,
  },
  location: {
    type: String,
    required: [true, "An event/conference must have a name"],
    unique: false,
  },
  eventURL: {
    type: String,
    required: [true, "An event/conference must have a location"],
    unique: false,
  },
  category: {
    type: String,
    required: [true, "An event/conference must have a category"],
    unique: false,
  },
});

const EventsConferences = mongoose.model("Events", eventsConferencesSchema);

module.exports = EventsConferences;
