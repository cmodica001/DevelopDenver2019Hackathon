"use strict";

const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const io = require("socket.io")(1337);

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
  const { Body: wordz } = req.body;
  if (wordz && wordz.length > 0) {
    const cleanMsg = removePunctuation(wordz);
    const uncommonWords = removeCommonWords(cleanMsg);
    const splitBody = uncommonWords.split(' ');

    // socket blusshit
    io.emit("wordz", splitBody);
    res.json(splitBody);
    return;
  }
  res.send();
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


function removePunctuation(messageString) {
  return messageString.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
}

function removeCommonWords(messageString) {
  return messageString.replace(commonWords , '');
}

const commonWords = /[a]|[able]|[about]|[across]|[after]|[all]|[almost]|[also]|[am]|[among]|[an]|[and]|[any]|[are]|[as]|[at]|[be]|[because]|[been]|[but]|[by]|[can]|[cannot]|[could]|[dear]|[did]|[do]|[does]|[either]|[else]|[ever]|[every]|[for]|[from]|[get]|[got]|[had]|[has]|[have]|[he]|[her]|[hers]|[him]|[his]|[how]|[however]|[i]|[if]|[in]|[into]|[is]|[it]|[its]|[just]|[least]|[let]|[like]|[likely]|[may]|[me]|[might]|[most]|[must]|[my]|[neither]|[no]|[nor]|[not]|[of]|[off]|[often]|[on]|[only]|[or]|[other]|[our]|[own]|[rather]|[said]|[say]|[says]|[she]|[should]|[since]|[so]|[some]|[than]|[that]|[the]|[their]|[them]|[then]|[there]|[these]|[they]|[this]|[tis]|[to]|[too]|[twas]|[us]|[wants]|[was]|[we]|[were]|[what]|[when]|[where]|[which]|[while]|[who]|[whom]|[why]|[will]|[with]|[would]|[yet]|[you]|[your]|[ain\'t]|[aren\'t]|[can\'t]|[could\'ve]|[couldn\'t]|[didn\'t]|[doesn\'t]|[don\'t]|[hasn\'t]|[he\'d]|[he\'ll]|[he\'s]|[how\'d]|[how\'ll]|[how\'s]|[i\'d]|[i\'ll]|[i\'m]|[i\'ve]|[isn\'t]|[it\'s]|[might\'ve]|[mightn\'t]|[must\'ve]|[mustn\'t]|[shan\'t]|[she\'d]|[she\'ll]|[she\'s]|[should\'ve]|[shouldn\'t]|[that\'ll]|[that\'s]|[there\'s]|[they\'d]|[they\'ll]|[they\'re]|[they\'ve]|[wasn\'t]|[we\'d]|[we\'ll]|[we\'re]|[weren\'t]|[what\'d]|[what\'s]|[when\'d]|[when\'ll]|[when\'s]|[where\'d]|[where\'ll]|[where\'s]|[who\'d]|[who\'ll]|[who\'s]|[why\'d]|[why\'ll]|[why\'s]|[won\'t]|[would\'ve]|[wouldn\'t]|[you\'d]|[you\'ll]|[you\'re]|[you\'ve]/gi