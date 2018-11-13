const express = require('express');
const tmi = require('tmi.js');
const myOptions = require('./api-options');
var app = express();
var server = app.listen(1200);



app.use(express.static('public'));


var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', connectionMade)

function connectionMade(socket) {

  console.log("connection " + socket);

  var client = new tmi.client(myOptions);
  client.connect();


  client.on("chat", function (channel, userstate, message, self) {

    if (message === "!followed") {
      socket.emit('newfollower', "orangegames");
    }
  });


}

