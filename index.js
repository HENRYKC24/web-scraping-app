const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const url = "https://www.gartner.com/en/conferences/calendar";

axios(url).then((result) => {
  const html = result.data;
  const $ = cheerio.load(html);

  const conferenceData = [];

  const titles = $("div.conference-tile");

  titles.each(function (index) {
    if ($(this).find("h6").text()) {
      conferenceData[index] = {
        title: $(this).find("h6").text(),
        date: $(this).find(".conference-date").text(),
        location: $(this).find(".conference-location").text(),
        url: `https://www.gartner.com${$(this).find("a").attr("href")}`,
      };
    }
  });
  console.log(conferenceData);
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
