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

  full_name       : String,
  first_name      : String,
  last_name       : String,
  photo_url       : String,
  party           : String,
  service_begin   : Number,
  service_end     : Number,
  committiees     : [String],
  bill_id         : [String]

});

var billsSchema = new mongoose.Schema({

  title     : String,
  summary   : String,
  session   : String,
  id        : String,
  bill_id   : String,
  sponsors  : [ { String :  String } ]

});

var committeeSchema = new mongoose.Schema({

  committee  : [String]

});

var contributionsSchema = new mongoose.Schema({

  contributor_type  : String,
  candidate_name    : String,
  amount            : Number,
  date              : String

});


// Mongoose Models //

var Candidate     = mongoose.model( 'candidate', candidateSchema );
var Committee     = mongoose.model( 'committee', committeeSchema );
var Bills         = mongoose.model( 'bill', billsSchema );
var Contributions = mongoose.model( 'contribution', contributionsSchema );


/**************************************
            * index.html
***************************************/



// server.get('/api/candidates') //
function getCandidates ( req, res ) {
  
  Candidate.find().sort({ last_name : 1 }).exec(
    function ( err, politicians ) {

      if ( err ) console.log( 'Error ' + err );
<<<<<<< HEAD
=======
      // console.log("politicians last name: " + politicians.last_name);
>>>>>>> front-end-jason

      res.json( politicians );

    });

}// getCanidates


// server.get('/api/committee') //
function getCommittees ( req, res ) {

  Committee.find( {},'committee members' ).exec( function ( err, comm ) {

    if ( err ) console.log( 'Error ' + err );

    res.json( comm );

  });

}// getCommittees


function getBills ( req, res ) {

  Bills.find( {}, 'title all_ids sponsors summary bill_id' ).exec( function ( err, bill ) {

    if ( err ) conosle.log( 'Error ' + err );

    res.json( bill );

  });

}// getBills


// server.get('/api/contributions') //
function getContributions ( req, res ) {

  Contributions.find({ date : { $gte: "2012-01-01T12:12:43" } }, 'contributor_type candidate_name date amount').exec(
    function ( err, money ) {

      if ( err ) console.log( 'Error ' + err );

      res.json( money );

    });

}// getContributions

<<<<<<< HEAD
function getSingleBills( req, res){
  console.log(req.params.id);
  Bills.find({id: req.params.id}, function(){
    console.log(bill);
    res.json(bill);
  })
}

=======
<<<<<<< HEAD
=======
function getSingleBill ( req, res ) {
  var bill_oid = req.params.oid;
  console.log(req.params);
  Bills.findOne({"_id": bill_oid}, function (err, bill) {
    // console.log(bill);
    res.json(bill);
    return;
  });
}

>>>>>>> front-end-jason
>>>>>>> c0e58968e5d62b49a9fe07c58fb1075f11f514ba

// ('/api/bills') //
function getBillbyID ( req, res ) {

  var bill_id = req.params.bill_id;

  Bill.findById( bill_id, function ( err, bill ) {

    if ( err ) console.log( 'Error' + err );

<<<<<<< HEAD
    if ( bill === null ) {

      return res.redirect( "/app" );
=======
    console.log("Bill Sponsors: " + bill.sponsors);
>>>>>>> front-end-jason

    }

    return res.view( "bill", { bill : bill } );
  
  });

}// getBillbyId


// ('/api/bill/billSupport') //
function getBillSupport ( req, res ) {

  Bill.find().exec( function ( err, bill ) {

    if ( err ) console.log( 'Error ' + err );

    console.log("friggen bills!");
    res.json( bill );

  });

}// getBillSupport

/**************************************
            * Route Handling
***************************************/

server.get('/api/candidates', getCandidates);
server.get('/api/contributions', getContributions);
server.get('/api/committees', getCommittees);
server.get('/api/bills', getBills);
server.get('/api/bills/:id', getSingleBills);

/**************************************
            * Server Setup
***************************************/
server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});
