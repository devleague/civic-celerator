var http = require('http');
var fs = require('fs');
// var mongoose = require('mongoose');

// var offset = 0,
//     staticPath = '/resource/jexd-xbcg.json?$limit=1';

var options = {
  hostname: 'openstates.org',
  path: '/api/v1//legislators/?state=hi&active=true&apikey=7720e008f10a45c7a114b988d78bba61',
  method: 'GET'
};

for (var i = 0; i < 1; i++) {
  getData();
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
