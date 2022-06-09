const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

app.get("/api/v1/calendar", (req, res) => {
  try {
    const baseURL = "https://www.gartner.com";
    const url = `${baseURL}/en/conferences/calendar`;
    axios(url)
      .then((result) => {
        const html = result.data;
        const $ = cheerio.load(html);

        const conferenceData = [];

        const titles = $("div.conference-tile");

        tites.each(function (index) {
          const title = $(this).find("h6").text();
          const date = $(this).find(".conference-date").text();
          const location = $(this).find(".conference-location").text();
          const url = `${baseURL}${$(this).find("a").attr("href")}`;
          if ($(this).find("h6").text()) {
            conferenceData[index] = {
              title,
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
          dataCount: conferenceData.length,
          data: {
            conferenceData,
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
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
