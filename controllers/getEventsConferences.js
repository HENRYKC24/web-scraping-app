const EventsConferences = require("../models/eventsModel");
const APIFeatures = require("../utils/APIFeatures");

// EVENTS AND CONFERENCES REQUEST HANDLER
exports.getEventsConferences = async (req, res) => {
  try {
    const query = new APIFeatures(EventsConferences.find(), req.query)
      .limitFields()
      .paginate();

    const eventsConferences = await query.mongoQueryObject;
    res.status(200).json({
      status: "success",
      dataCount: eventsConferences.length,
      data: {
        eventsConferences,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
