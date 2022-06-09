// IMPORT THIRD PART LIBRARY
const axios = require("axios");
const cheerio = require("cheerio");

// EVENT REQUEST HANDLER
exports.getEvents = (req, res) => {
  try {
    const baseURL = "https://www.techmeme.com";
    const url = `${baseURL}/events`;
    axios(url)
      .then((result) => {
        const html = result.data;
        const $ = cheerio.load(html);

        const eventsData = [];

        // GET ALL INSTANCES OF THE EVENTS
        const events = $(".rhov");

        events.each(function (index) {
          const date = $(this).find("a div:first-child").text();
          const name = $(this).find("a div:nth-child(2)").text();
          const location = $(this).find("a div:nth-child(3)").text();
          const url = `${baseURL}${$(this).find("a").attr("href")}`;
          
          eventsData[index] = {
            name: name.replace("REGISTER NOW", "").trim(),
            date,
            location: location || "N/A",
            url,
            category: name.toLowerCase().includes("virtual")
              ? "Virtual"
              : name.toLowerCase().includes("hybrid")
              ? "Hybrid"
              : "In-Person",
          };
        });
        res.status(200).json({
          status: "success",
          dataCount: eventsData.length,
          data: {
            eventsData,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: "fail",
          message: err.message,
        });
      });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};
