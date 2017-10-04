/**
 * @Author: Yashwardhann
 * @Date:   30-09-2017
 * @Last modified by:   Yashwardhann
 * @Last modified time: 30-09-2017
 */


const express = require('express');

var bodyParser = require('body-parser');

const nlp = require('compromise');


const natural = require('natural'); // NLP Module

const tokenizer = natural.WordTokenizer(); // Splits words into an array
const classifier = natural.BayesClassifier(); // Training of stemming

// Measure of words in a string
const TfIdf = natural.TfIdf;
var tfidf = new TfIdf();

const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs');
app.use(express.static('public'));


const server = app.listen(8080, function() {
  console.log('Listening to port ' + server.address().port);
});

var str; // search query
var headlines = [];
var calc,total = 0;

app.get('/', function(req,res) {
  res.render('index');
});

app.post('/', urlencodedParser, function(req,res) {


  var sources = req.body.arr;

  var arr = JSON.parse(sources);

  console.log(sources);

  console.log(arr.length);

  for(var i = 1; i < arr.length; i++)
  {
    str = arr[0];

    calc = dist(str, arr[i]);

    console.log('============ ' + calc + ' ==================');

    total = total + calc;

    console.log('============== ' + total + ' ===============');



  }


  if (total > 7.5) {
    console.log('WE THINK THIS STORY IS TRUE');
  } else {
    console.log('WE THINK THIS STORY IS FAKE');
  }
});



// Calculate the difference between query and results

function dist(_source, _target) {
  // Returns value between 0 and 1
  var dist = natural.JaroWinklerDistance(_source, _target);

  console.log('\n' + '------------ Dist ---------------');
  console.log("Distance is: " + dist);
  console.log('---------------------------------');

  return dist;
}

var words;
var measure1 = 0, measure2 = 0;
var sum = 0;


var headlines = [];
var req_local;
var score = 0, item;

function check(req) {

}

check('hi i am yash');


// Check measure of words of query and results
var exp = function (pre_source, pre_target) {
  // Remove whitespace, case, punctuation, contractions and values
  var _source = nlp(pre_source).normalize().out('text');
  var _target = nlp(pre_target).normalize().out('text');
  words = _source.split(" "); // Array of words
  words2 = _target.split(" "); // Array of words

  tfidf.addDocument(_source); // Docs to be evaluated
  tfidf.addDocument(_target); // Docs to be evaluated

  // Loop words to check measure in both strings
  for(var j = 0; j <= words.length - 1; j++)
  {

    console.log('----------------------------------------------');

    var _word = words[j];

    var measure = tfidf.tfidf(_word, 0);
    measure1 += Number(measure);
    console.log('Measure of ' + _word + ' is ' + measure);
    console.log("Measure is " + measure1);

  }

      console.log('\n' + '**************** Loop 2 *****************'+ '\n');

  // Evaluate second string for words of string 1
  for(var k = 0; k <= words.length - 1; k++)
  {
    console.log('----------------------------------------------');
    var _word2 = words[k];
    var _measure = tfidf.tfidf(_word2, 1);
    measure2 += Number(_measure);
    console.log('Measure of ' + _word2 + ' is ' + _measure);
    console.log("Measure is " + measure2);
  }


  var diff = (measure1 > measure2) ? measure1 - measure2 : measure2 - measure1;
  console.log('\n' + '-----------------------------------');
  console.log("\n" + "Difference is " + diff);

  // Get Difference between total measures
  if (diff > words.length / 2 - 0.1) {

    console.log("WE THINK THIS NEWS IS FAKE");
  }


}
