// const { response } = require("express");
const _ = require("lodash");
// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const cors = require("cors");

const app = express();
const fs = require("fs");

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:

//START OF YOUR CODE...
//   /                  - Return some helpful welcome info (text)
app.use(cors());
app.get("/", (req, res) => {
  const msg = "welcome to Ali Quotes,go!";
  const visitTime = new Date();
  res.status(200).send(getInfo(msg, visitTime));
});

const getInfo = (msg, visitTime) => ({
  date: visitTime.toISOString(),
  message: msg,
});
//   /quotes            - Should return all quotes (json)

app.get("/quotes", (req, res) => {
  const visitTime = new Date();
  res.status(200).send(allQuotes(visitTime, quotes));
});

const allQuotes = (visitTime, quotes) => ({
  date: visitTime.toISOString(),
  quotes: quotes,
});

//   /quotes/random     - Should return ONE quote (json)

const getRandomInt = (sizeListQuotes) => {
  return Math.floor(Math.random() * sizeListQuotes);
};

app.get("/quotes/random", (req, res) => {
  sizeObjectQuotes = quotes.length;
  quoteRandom = getRandomInt(sizeObjectQuotes);
  res.status(200).send(randomQuote(quotes[quoteRandom]));
});

const randomQuote = (quoteRandom) => ({
  date: new Date().toISOString(),
  quoteRandom: quoteRandom,
});

app.get("/lodash/quotes/random", (req, res) => {
  sizeObjectQuotes = quotes.length;
  quoteRandom = _.random(sizeObjectQuotes);
  res.status(200).send(randomQuote(quotes[quoteRandom]));
});

app.get("/", function (request, response) {
  response.send("Ali's Quote Server!  Ask me for /quotes/random, or /quotes");
});


const getListSearchWord = (searchWord) => {
  const listSearchWord = quotes.filter((quote) =>
    quote.quote.toLocaleLowerCase().includes(searchWord.toLowerCase())
  );
  return listSearchWord;
};
/*
-`/quotes/search?term=life`
- `/quotes/search?term=success`
- `/quotes/search?term=miss`
*/
app.get("/quotes/search", (req, res) => {
  let searchWord = req.query.term;
  if (searchWord.length > 0) {
    let listSearchWords = getListSearchWord(searchWord);
    res.status(200).send(searchingWithWord(listSearchWords));
  } else {
    res.status(400).send(searchingWithoutWord());
  }
});
const searchingWithWord = (listSearchWords) => {
  return {
    date: new Date().toISOString(),
    quotes: listSearchWords,
  };
};

const searchingWithoutWord = () => {
  return {
    date: new Date().toISOString(),
    message: "You must write the word to search for ",
  };
};

//...END OF YOU<R CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = app;
