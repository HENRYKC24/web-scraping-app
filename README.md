# Web Scrapping Services
This is an API built for scraping events from web pages.

## Built With

- NodeJS
- Express
- Axios
- Cheerio
- MongoDB

## Live Demo

[Live Demo Link](https://henry-kc-web-scrapping-app.herokuapp.com/api/v1/events-conferences)

## Application Tradeoffs
This application constantly deletes data from the database everyday and repopulates the data with the current data from the crapped events website. This is done so that all the events in the database are in sync with the event website data.

## Application Efficiency
The application API architecture provides the services similar to GraphQL. You can efficiently get only the data you need and nothing else. This feature was implemented with the `fields` provided in the query string.


# API Documentation

This API only uses `GET` request to communicate to the server with the endpoint `https://henry-kc-web-scrapping-app.herokuapp.com/api/v1/events-conferences`. 

All responses come in standard JSON. 

## Response Codes 

### Response Codes
```
200: Success
404: Not Found
50X: Server Error
```

### Example Error Message
```json
http code 500
{
  status: "fail",
  message: "Internal server error",
}
```

### Example success Message
```json
http code 200
{
  "status": "success",
  "dataCount": 2,
  "data": {
    "eventsConferences": [
      {
        "_id": "62a76cda4fd7ccf895a4435d",
        "name": "Gartner Security & Risk Management Summit",
        "date": "21 – 22 Jun 2022",
        "location": "Sydney, Australia",
        "eventURL": "https://www.gartner.com/en/conferences/apac/security-risk-management-australia",
        "category": "In-Person"
      },
      {
        "_id": "62a76cda4fd7ccf895a4435c",
        "name": "ガートナー アプリケーション・イノベーション ＆ ビジネス・ソリューション サミット",
        "date": "16 – 17 Jun 2022",
        "location": "Japan | Virtual",
        "eventURL": "https://www.gartner.com/jp/conferences/apac/applications-japan",
        "category": "Virtual"
      }
    ]
  }
}

```

### GET REQUEST:

`https://henry-kc-web-scrapping-app.herokuapp.com/api/v1/events-conferences`

The above endpoint returns all events with a default pagination of 20 results per page

**Response:**
```json
{
  "status": "success",
  "dataCount": 20,
  "data": {
    "eventsConferences": [
      {
        "_id": "62a76cda4fd7ccf895a4435d",
        "name": "Gartner Security & Risk Management Summit",
        "date": "21 – 22 Jun 2022",
        "location": "Sydney, Australia",
        "eventURL": "https://www.gartner.com/en/conferences/apac/security-risk-management-australia",
        "category": "In-Person"
      },
      {
        "_id": "62a76cda4fd7ccf895a4435c",
        "name": "ガートナー アプリケーション・イノベーション ＆ ビジネス・ソリューション サミット",
        "date": "16 – 17 Jun 2022",
        "location": "Japan | Virtual",
        "eventURL": "https://www.gartner.com/jp/conferences/apac/applications-japan",
        "category": "Virtual"
      },
      ...
```

### GET REQUEST With Field Filter:

`https://henry-kc-web-scrapping-app.herokuapp.com/api/v1/events-conferences?fields=name,location`

The above endpoint returns all events with a default pagination of 20 results per page but the documents will contain only the name, location and the id fields.

**Response:**
```json
{
  "status": "success",
  "dataCount": 20,
  "data": {
    "eventsConferences": [
      {
        "_id": "62a76cda4fd7ccf895a4435d",
        "name": "Gartner Security & Risk Management Summit",
        "location": "Sydney, Australia",
      },
      {
        "_id": "62a76cda4fd7ccf895a4435c",
        "name": "ガートナー アプリケーション・イノベーション ＆ ビジネス・ソリューション サミット",
        "location": "Japan | Virtual",
      },
      ...
```

### GET REQUEST With Field Filter:

`https://henry-kc-web-scrapping-app.herokuapp.com/api/v1/events-conferences?fields=name,location`

The above endpoint returns all events with a default pagination of 20 results per page but the documents will contain only the name, location and the id fields.

**Response:**
```json
{
  "status": "success",
  "dataCount": 20,
  "data": {
    "eventsConferences": [
      {
        "_id": "62a76cda4fd7ccf895a4435d",
        "name": "Gartner Security & Risk Management Summit",
        "location": "Sydney, Australia",
      },
      {
        "_id": "62a76cda4fd7ccf895a4435c",
        "name": "ガートナー アプリケーション・イノベーション ＆ ビジネス・ソリューション サミット",
        "location": "Japan | Virtual",
      },
      ...
```

### GET REQUEST With Page Limit:

`https://henry-kc-web-scrapping-app.herokuapp.com/api/v1/events-conferences?limit=4`

The above endpoint URL returns all events with 4 items per page.

**Response:**
```json
{
  "status": "success",
  "dataCount": 4,
  "data": {
    "eventsConferences": [
      {
        "_id": "62a76cda4fd7ccf895a4435d",
        "name": "Gartner Security & Risk Management Summit",
        "location": "Sydney, Australia",
      },
      {
        "_id": "62a76cda4fd7ccf895a4435c",
        "name": "ガートナー アプリケーション・イノベーション ＆ ビジネス・ソリューション サミット",
        "location": "Japan | Virtual",
      },
      ...
```


### GET REQUEST With A Particular Page:

`https://henry-kc-web-scrapping-app.herokuapp.com/api/v1/events-conferences?page=2`

The above endpoint URL returns page 2 of all events in the database. It shows from item 21 to 40 (with default limit of 20 per page)

**Response:**
```json
{
  "status": "success",
  "dataCount": 20,
  "data": {
    "eventsConferences": [
      {
        "_id": "62a76cda4fd7ccf895a44376",
        "name": "Gartner Security & Risk Management Summit",
        "date": "27 – 28 Feb 2023",
        "location": "Dubai, UAE",
        "eventURL": "https://www.gartner.com/en/conferences/emea/security-risk-management-uae",
        "category": "In-Person"
      },
      {
        "_id": "62a76cda4fd7ccf895a44371",
        "name": "Gartner IT Symposium/Xpo™",
        "date": "14 – 16 Nov 2022",
        "location": "Kochi, India",
        "eventURL": "https://www.gartner.com/en/conferences/apac/symposium-india",
        "category": "In-Person"
      },
      ...
```
#### You can combine the limit and page like so:

`https://henry-kc-web-scrapping-app.herokuapp.com/api/v1/events-conferences?page=10&limit=8`

This produces a response of 8 items per page and tries to get page 10. If the requested page is not available, the `dataCound` field becomes zero (0)


## Run App Locally

### To get a local copy up and running follow these simple example steps.

Clone the repo with `git clone https://github.com/HENRYKC24/web-scraping-app.git`

Run `cd web-scraping-app` to navigate to the project folder

Run `npm install` from the command line to install all dependencies

Run `npm start` to start the local server in the a browser

Runs the app in the development mode.\

Open [http://localhost:8000/api/v1/events-conferences](http://localhost:8000/api/v1/events-conferences) to view it in the browser or postman.

## Author

👤 **Henry Kc**

- GitHub: [@githubhandle](https://github.com/henrykc24)
- Twitter: [@twitterhandle](https://twitter.com/henrykc24)
- LinkedIn: [LinkedIn](https://linkedin.com/in/henry-kc)


## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/HENRYKC24/web-scraping-app/issues/).

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments
- I remain indebted to all software engineers across the world for helping me in one way or the other in the project and in my career.

## 📝 License

This project is [MIT](./LICENSE) licensed.
