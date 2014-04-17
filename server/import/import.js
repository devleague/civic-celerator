

var http = require('http');
var fs = require('fs');
// var mongoose = require('mongoose');

var offset = 0,
    staticPath = '/resource/jexd-xbcg.json?$limit=1';

var options = {
  hostname: 'data.hawaii.gov',
  port: 80,
  path: staticPath,
  method: 'GET'
};

for (var i = 0; offset <= 1; i++) {
  getData();
  offset++;
  options.path = staticPath;
}

function getData() {
  var data = '';

  http.get(options, function(resp){
    resp.
      on('data', function (chunk){
        /*
        * Data is streaming to us in chunks. We are subscribed to this stream
        * We are saving the data to the 'data' variable declared outside of this
        * function's scope.
        */
        data += chunk;
      }).
      on('end', function (chunk) {
        /*
        * Output the contents of the stream, once it is done, asyncronously
        */
        // console.log('adding data to file...');
        // fs.appendFile('data.txt', data, function (err) {
        //   if (err) throw err;
        //   console.log('The "data to append" was appended to file!');
        //   data = '';
        // });
        var niceData = JSON.parse(data);
        console.log(niceData);
      });
  }).on("error", function(e){
    console.log("Got error: " + e.message);
  });
}
