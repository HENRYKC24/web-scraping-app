const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = require("./index");
const { sendSiteDataToDatabase } = require("./utils/sendSiteDataToDatabase");
dotenv.config({ path: "./config.env" });

const DB = process.env.MONGODB_REMOTE_SERVER.replace(
  "<PASSWORD>",
  process.env.MONGODB_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const oneDay = 86400000;

    // SEND ALL DATA TO THE DATABASE
    sendSiteDataToDatabase();

    // UPDATE THE DATABASE EVERYDAY
    setInterval(() => {
      sendSiteDataToDatabase();
    }, oneDay);

    console.log("MongoDB connection successful");
  });

// RUN SERVER
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
