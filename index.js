const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const url = "https://www.gartner.com/en/conferences/calendar";

axios.get(url).then((result) => {
  const html = result.data;
  const $ = cheerio.load(html);
  const some = $(".conference-title", html);
  some.each(function () {
    console.log($(this).text());
  });
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
