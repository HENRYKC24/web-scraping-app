const express = require("express");
const conferenceRoute = require("./routes/conference");
const eventsRoute = require("./routes/events");

const app = express();

app.use("/api/v1/conferences", conferenceRoute);
app.use("/api/v1/events", eventsRoute);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
