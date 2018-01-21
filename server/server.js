require('now-logs')('nasaChatApp');
var express = require('express');
var bodyParser = require('body-parser');
var Pusher = require('pusher');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var pusher = new Pusher({
  appId: '460761',
  key: '6f48f906c45c9541f9da',
  secret: '7a7659b7463d25de4461',
  cluster: 'eu',
  encrypted: true,
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


app.post('/', function(req, res) {
  pusher.trigger('my-channel', 'my-event', {
    "name": req.body.name,
    "message": req.body.message,
  });
  console.log('req ', req.body);
})

app.get('/', function(req, res) {
  res.send("KAKO Jsadaddsadasd ");
})



var port = process.env.PORT || 5000;

app.listen(port);
