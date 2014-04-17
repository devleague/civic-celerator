/**************************************
            * Dependencies
**************************************/

var restify   = require('restify');
var server    = restify.createServer();
var mongoose  = require('mongoose/');

server.use(restify.bodyParser());


/**************************************
            * Mongoose.js
***************************************/

// var config = require('./config');
db = mongoose.connect('mongodb://localhost/text');


// Mongoose Schemas //
var candidateSchema = new mongoose.Schema({

  first_name      : String,
  last_name       : String,
  photo_url       : String,
  party           : String,
  service_begin   : Number,
  service_end     : Number,
  committiees     : [String],
  sponsored_bills : [String]

});

var contributionsSchema = new mongoose.Schema({

  contributor_name  : String,
  candidate_name    : String,
  amount            : Number,
  employer          : String,
  industry          : String,
  date_contributed  : Date,

});

// Mongoose Models //
var Candidate     = mongoose.model( 'candidate', candidateSchema );
var Contributions = mongoose.model( 'contribution', contributionsSchema );


// server.get('/api/candidates') //
function getCandidates ( req, res ) {
  
  /* figure out how to get the page number to increment up in the db */
  var page = req.params.page  

  Candidate.find().sort().skip( 150 * page ).limit( 150 ).exec(
    function () {


    });


}// getCanidates

// server.get('/api/contributions') //
function getContributions ( req, res ) {


}// getContributions 

/**************************************
            * Route Handling
***************************************/

server.get('/api/candidates', getCandidates);
server.get('/api/contributions', getContributions);

/**************************************
            * Server Setup
***************************************/
server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});