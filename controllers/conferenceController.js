// IMPORT THIRD PART LIBRARY
const axios = require("axios");
const cheerio = require("cheerio");

// CONFERENCES REQUEST HANDLER
exports.getConferences = (req, res) => {
  try {
    const baseURL = "https://www.gartner.com";
    const url = `${baseURL}/en/conferences/calendar`;
    axios(url)
      .then((result) => {
        const html = result.data;
        const $ = cheerio.load(html);

        const conferencesData = [];

        // GET ALL INSTANCES OF THE CONFERENCES
        const conferences = $("div.conference-tile");

        conferences.each(function (index) {
          if ($(this).find("h6").text()) {
            const name = $(this).find("h6").text();
            const date = $(this).find(".conference-date").text();
            const location = $(this).find(".conference-location").text();
            const url = `${baseURL}${$(this).find("a").attr("href")}`;
            conferencesData[index] = {
              name,
              date,
              location,
              url,
              category: location.toLowerCase().includes("virtual")
                ? "Virtual"
                : "In-Person",
            };
          }
        });
        res.status(200).json({
          status: "success",
          dataCount: conferencesData.length,
          data: {
            conferenceData: conferencesData,
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
