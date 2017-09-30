/**
 * @Author: Yashwardhann
 * @Date:   30-09-2017
 * @Last modified by:   Yashwardhann
 * @Last modified time: 30-09-2017
 */

const express = require('express');

const natural = require('natural'); // NLP Module

const tokenizer = natural.WordTokenizer(); // Splits words into an array
const classifier = natural.BayesClassifier(); // Training of stemming

// Measure of words in a string
const TfIdf = natural.TfIdf;
var tfidf = new TfIdf();

const app = express();


const server = app.listen(8080, function() {
  console.log('Listening to port ' + server.address().port);
});

app.get('/', function(req,res) {
  res.send('Natural!');
});

var str = "Exunclan loses"; // search query


// Calculate the difference between query and results

function dist(_source, _target) {
  // Returns value between 0 and 1
  var diff = natural.JaroWinklerDistance(_source, _target);

  console.log("Score: " + diff);
}

var words;

// Check measure of words of query and results
var exp = function (_source, _target) {
  words = _source.split(" "); // Array of words
  words2 = _target.split(" "); // Array of words

  tfidf.addDocument(_source); // Docs to be evaluated
  tfidf.addDocument(_target); // Docs to be evaluated

  // Loop words to check measure in both strings
  for(var j = 0; j <= words.length - 1; j++)
  {

    console.log('----------------------------------------------');

    var _word = words[j];

    tfidf.tfidfs(_word, function(i, measure) {
      console.log(_word + ' ----- document #' + i + ' is ' + measure);
    });
  }

      console.log('\n' + '**************** Loop 2 *****************'+ '\n');

  // Evaluate second string
  for(var k = 0; k <= words.length - 1; k++)
  {
    console.log('----------------------------------------------');

    var _word2 = words2[k];

    tfidf.tfidfs(_word2, function(i, measure) {
      console.log(_word2 + '----- document #' + i + ' is ' + measure);
    });
  }


}

exp("Akshay kumar new movie", "New movie by akshay kumar");
