// Current session
// http://api.legiscan.com/?key=61d61680b457f843fa7bcb3033be59b9&op=getMasterList&state=HI
//
// in 2014 (same as above)
// http://api.legiscan.com/?key=61d61680b457f843fa7bcb3033be59b9&op=getMasterList&state=HI
//
// in 2013
// http://api.legiscan.com/?key=61d61680b457f843fa7bcb3033be59b9&op=getMasterList&id=997
//
// in 2012
// http://api.legiscan.com/?key=61d61680b457f843fa7bcb3033be59b9&op=getMasterList&id=927
//
// in 2011
// http://api.legiscan.com/?key=61d61680b457f843fa7bcb3033be59b9&op=getMasterList&id=124
//
// in 2010
// http://api.legiscan.com/?key=61d61680b457f843fa7bcb3033be59b9&op=getMasterList&id=63

var offset = [];
    offset[0] = '&op=getMasterList&id=63';
    offset[1] = '&op=getMasterList&id=124';
    offset[2] = '&op=getMasterList&id=927';
    offset[3] = '&op=getMasterList&id=997';
    offset[4] = '&op=getMasterList&state=HI';
var apiKey = '?key=61d61680b457f843fa7bcb3033be59b9'

var http = require('http');
var fs = require('fs');
// var mongoose = require('mongoose');

// var offset = 0,
//     staticPath = '/resource/jexd-xbcg.json?$limit=1';

var options = {
  hostname: 'api.legiscan.com',
  port: 80,
  path: apiKey + offset[4],
  method: 'GET'
};

for (var i = 0; i < offset.length; i++) {
  getData();
  console.log('changing year');
  options.path = apiKey + offset[i];
}

function getData() {
  var data = '';

  http.get(options, function(resp){
    resp.
      on('data', function (chunk){
        data += chunk;
      }).
      on('end', function (chunk) {
        var niceData = JSON.parse(data);
        console.log(niceData);
      });
  }).on("error", function(e){
    console.log("Got error: " + e.message);
  });
}
