// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp/:datetime', function(req, res){
  if (req.params.datetime == '')
    return res.json({unix: new Date(), utc: new Date().toString()});
  var date;
  if (req.params.datetime instanceof Date) 
    date = req.params.datetime;
  else if (!isNaN(new Date(req.params.datetime).getTime()))
    date = new Date(req.params.datetime);
  else if (!isNaN(parseInt(new Date(req.params.datetime)*1000)))
    date = new Date(parseInt(new Date(req.params.datetime))*1000);
  else
    return res.json({error: 'Invalid Date'});
  return res.json({unix: date.getTime(), utc: date.toUTCString()});
});

app.get('/api/timestamp/', function(req, res){
  return res.json({unix: new Date().getTime(), utc: new Date().toUTCString()});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});