const express = require("express");
const conferenceRoute = require("./routes/conference");

const app = express();

app.use("/api/v1", conferenceRoute);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
