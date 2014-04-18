/**************************************
            * Dependencies
**************************************/

var restify   = require('restify');
var server    = restify.createServer();
var mongoose  = require('mongoose');

server.use(restify.bodyParser());
mongoose.connect('mongodb://kingtak:kingtak@ds041367.mongolab.com:41367/civ_accelerator');


/**************************************
            * Mongoose.js
***************************************/

// Mongoose Schemas //

var candidateSchema = new mongoose.Schema({

  first_name      : String,
  last_name       : String,
  photo_url       : String,
  party           : String,
  service_begin   : Number,
  service_end     : Number,
  committiees     : [String],
  bill_id         : [String]

});

var contributionsSchema = new mongoose.Schema({

  contributor_name  : String,
  candidate_name    : String,
  amount            : Number,
  employer          : String,
  industry          : String,
  date_contributed  : Date,

});

var committeeSchema = new mongoose.Schema({

  committee  : [String]

});

// Mongoose Models //

var Candidate     = mongoose.model( 'candidate', candidateSchema );
var Contributions = mongoose.model( 'contribution', contributionsSchema );
var Committee     = mongoose.model( 'committee', committeeSchema );


/**************************************
            * index.html
***************************************/


// server.get('/api/candidates') //
function getCandidates ( req, res ) {
  
  Candidate.find().sort({ last_name : 1 }).exec(
    function ( err, politicians ) {

      if ( err ) console.log( 'Error ' + err );

      res.json( politicians );

    });

}// getCanidates

// server.get('/api/committee') //
function getCommittees ( req, res ) {

  Committee.find( function ( err, comm ) {

    if ( err ) console.log( 'Error ' + err );

    console.log()
    res.json( comm );

  });

}


// server.get('/api/contributions') //
function getContributions ( req, res ) {

  Contributions.find().sort().exec(
    function ( err, money ) {

      if ( err ) console.log( 'Error ' + err );

      res.json( money );

    });

}// getContributions


/**************************************
            * Route Handling
***************************************/

server.get('/api/candidates', getCandidates);
server.get('/api/contributions', getContributions);
server.get('/api/committees', getCommittees);

/**************************************
            * Server Setup
***************************************/
server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});