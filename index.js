"use strict";

const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8080;

// set the view engine to ejs
app.set("view engine", "ejs");

// make express look in the public directory for assets (css/js/img)
app.use(express.static(`./`)); // Serves up dist as a static folder

// Set the route
app.get("*", (req, res) => {
  // ejs render automatically looks in the views folder
  res.render("index");
});

// Handle the SMS comimn in
app.post("/sms", (req, res) => {
  console.log(req.body);
});
// Handle the SMS comimn in
app.post("/status", (req, res) => {
  console.log(req, res);
  res.send();
});

// Listen on the portttt
app.listen(port, () => {
  console.log(`Our app is running on port ${port}`);
});
