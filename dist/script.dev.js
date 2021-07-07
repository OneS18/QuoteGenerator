"use strict";

var quoteContainer = document.getElementById('quote-container');
var quoteText = document.getElementById('quote');
var authorText = document.getElementById('author');
var twitterBtn = document.getElementById('twitter');
var newQuoteBtn = document.getElementById('new-quote');
var loader = document.getElementById('loader');
var apiQuotes = [];

function showLoadingSpiner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpiner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
} //show new quote


function newQuote() {
  showLoadingSpiner(); //pick random quote form apiQuotes array

  var quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]; //chech is author field is blank and replace with 'unknown'

  if (!quote.author) {
    authorText.textContent = 'unknown';
  } else {
    authorText.textContent = quote.author;
  } //check quote lengh to determine the styling


  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  } //set quote, hide loader


  quoteText.textContent = quote.text;
  removeLoadingSpiner();
} //get quotes from APi


function getQuotes() {
  var apiUrl, response;
  return regeneratorRuntime.async(function getQuotes$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          apiUrl = 'https://type.fit/api/quotes';
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch(apiUrl));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          apiQuotes = _context.sent;
          newQuote();
          _context.next = 13;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](1);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 11]]);
} //tweet quote


function tweetQuote() {
  var twitterUrl = "https://twitter.com/intent/tweet?text=".concat(quoteText.textContent, " - ").concat(authorText.textContent);
  window.open(twitterUrl, '_blank');
} //event listeners


newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote); //onload

getQuotes(); // loading()