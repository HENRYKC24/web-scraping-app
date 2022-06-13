const axios = require("axios");
const cheerio = require("cheerio");
const EventsConferences = require("../models/eventsModel");

const sendSiteDataToDatabase = async () => {
  // CLEAR DATABASE
  await EventsConferences.deleteMany();

  // GET CONFERENCE DATA
  try {
    const baseURL = "https://www.gartner.com";
    const url = `${baseURL}/en/conferences/calendar`;

    axios(url)
      .then(async (result) => {
        const html = result.data;
        const $ = cheerio.load(html);

        const eventsConferencesArray = [];

        // GET ALL INSTANCES OF THE CONFERENCES
        const conferences = $("div.conference-tile");

        conferences.each(function (index) {
          if ($(this).find("h6").text()) {
            const name = $(this).find("h6").text();
            const date = $(this).find(".conference-date").text();
            const location = $(this).find(".conference-location").text();
            const eventURL = `${baseURL}${$(this).find("a").attr("href")}`;

            // APPEND EACH CONFERENCE TO THE ARRAY OF EVENTS/CONFERENCES
            eventsConferencesArray[index] = {
              name,
              date,
              location,
              eventURL,
              category: location.toLowerCase().includes("virtual")
                ? "Virtual"
                : "In-Person",
            };
          }
        });
        // SEND DATA TO THE DATABASE
        await EventsConferences.create(eventsConferencesArray);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }

  // GET EVENTS DATA
  try {
    const baseURL = "https://www.techmeme.com";
    const url = `${baseURL}/events`;
    axios(url)
      .then(async (result) => {
        const html = result.data;
        const $ = cheerio.load(html);

        const eventsData = [];

        // GET ALL INSTANCES OF THE EVENTS
        const events = $(".rhov");

        events.each(function (index) {
          const date = $(this).find("a div:first-child").text();
          const name = $(this).find("a div:nth-child(2)").text();
          const location = $(this).find("a div:nth-child(3)").text();
          const eventURL = `${baseURL}${$(this).find("a").attr("href")}`;
          
          // APPEND EACH EVENT TO THE ARRAY OF EVENTS/CONFERENCES
          eventsData[index] = {
            name: name.replace("REGISTER NOW", "").trim(),
            date,
            location: location || "N/A",
            eventURL,
            category: name.toLowerCase().includes("virtual")
              ? "Virtual"
              : name.toLowerCase().includes("hybrid")
              ? "Hybrid"
              : "In-Person",
          };
        });
        // SEND DATA TO THE DATABASE
        await EventsConferences.create(eventsData);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

exports.sendSiteDataToDatabase = sendSiteDataToDatabase;
