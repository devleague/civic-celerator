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

var billSchema = new mongoose.Schema({
  bill_id       : String,
  session       : String,
  title         : String,
  summary       : String,
  sponsors      : [String]
});

// Mongoose Models //

var Candidate     = mongoose.model( 'candidate', candidateSchema );
var Contributions = mongoose.model( 'contribution', contributionsSchema );
var Committee     = mongoose.model( 'committee', committeeSchema );
var Bill          = mongoose.model( 'bills', billSchema );


/**************************************
            * index.html
***************************************/


// server.get('/api/candidates') //
function getCandidates ( req, res ) {
  
  /* figure out how to get the page number to increment up in the db */
  var page = req.params.page;

  Candidate.find().sort({ last_name : 1 }).exec(
    function ( err, politicians ) {

      if ( err ) console.log( 'Error ' + err );
      console.log(politicians);
      res.json( politicians );

    });

}// getCanidates


// server.get('/api/contributions') //
function getContributions ( req, res ) {

  var page = req.params.page;

  Contributions.find().sort().exec(
    function ( err, money ) {

      if ( err ) console.log( 'Error ' + err );

      res.json( money );

    });

}// getContributions 

function getBillbyID ( req, res ) {
  var bill_id = req.params.bill_id;

  Bill.findById(bill_id, function (err, bill) {
    if (err) console.log( 'Error' + err);

    console.log("hello" + bill.sponsors);

    if (bill === null) {
      return res.redirect("/app");
    }

    return res.view("bill", {
      bill: bill
    });
  });

}// getBillbyId

/**************************************
            * Route Handling
***************************************/

server.get('/api/candidates', getCandidates);
server.get('/api/contributions', getContributions);
server.get('/api/bills/:id', getBillbyID);


/**************************************
            * Server Setup
***************************************/
server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});