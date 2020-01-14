const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require("node-cron");
const app = express();
const port = process.env.PORT || 3000;
const request = require("request-promise");
const options = require("./config/middleware");
const path = require("path");

const bcrypt = require('bcryptjs');

const graphApiKeys = require("./config/graphApiKeys");

const db = require("./config/db.js");
const id = require("./config/idBillennium");
const middle = require("./config/middleware");

const billennium = "billennium";

token = "";
client_id = graphApiKeys.client_id;
scope = graphApiKeys.scope;
client_secret = graphApiKeys.client_secret;
grant_type = graphApiKeys.grant_type;
tenant = graphApiKeys.tenant;
url = `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`;

// options.options.headers["Content-Type"] = "application/x-www-form-urlencoded";
// options.options.uri = url;
// options.options.body = `client_id=${client_id}&scope=${scope}&client_secret=${client_secret}&grant_type=${grant_type}`;

const idBillennium = id.idBillennium;

// const middleware = (req, res, next) => {
//   if (req.originalUrl.indexOf("api") === 1) {
//     console.log("api");
//     let token = req.headers.token;
//     if (!token) {
//       return res.sendStatus(401);
//     }

//     const options = middle.options;
//     options.uri = middle.urlCompanyData;
//     options.headers.Authorization = `Bearer ${token}`;

//     request(options).then(response => {
//       let idCompanyUser = response.value[0].id;
//       if (idBillennium === idCompanyUser) {
//         next();
//       } else return res.sendStatus(401);
//     }).catch(err => {
//       return res.sendStatus(401);
//     });
//   } else res.sendFile(path.join(__dirname, "./graph-tutorial", "index.html"));
// };

app.use(
  cors({
    allowedHeaders: ["sessionId", "Content-Type", "Authorization", "token"],
    exposedHeaders: ["sessionId"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
  })
);

// app.use(express.static("./graph-tutorial"));
// app.use(middleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoClient = new MongoClient(db.url, { useNewUrlParser: true });

let dbClient;
let dbKudos;
let dbCompany;

mongoClient.connect(function (err, client) {
  dbClient = client;
  dbKudos = client.db("KudosDB").collection("Billennium");
  dbCompany = client.db("KudosDB").collection("BillenniumConfig");
  require("./app/routesKudos")(app, dbKudos);
  require("./app/routesConfig")(app, dbCompany);

  console.log("start listening server on port 3000")

  app.listen(port, function () { });
});

process.on("SIGINT", () => {
  dbClient.close();
  process.exit();
});
