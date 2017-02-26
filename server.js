"use strict"
var io = require('socket.io').listen(3000);
var url = require('url');
var querystring = require('querystring');
var secret = process.env.FLASH_TOKEN;

io.set('authorization', function(handshake, cb) {
  var query = url.parse(handshake.url).query;
  var token = querystring.parse(query).token;
  if (token === secret) {
    cb(null, true);
  } else {
    console.log('no auth, user token: ', token)
    cb('Not Authorized, suckaaa!!', false)
  }
})

let blockSignals = false;

io.sockets.on('connection', function(socket) {
  console.log('connection made with ' + socket);
  socket.on('flash', function() {
    io.emit('flash')
  })
  socket.on('dance', function() {
    io.emit('dance')
  })
  socket.on('on', function() {
    if (!blockSignals) {
      console.log('emitting on')
      io.emit('on')
    }
    blockSignals = true;
  })
  socket.on('onYellow', function() {
    if (!blockSignals) {
      io.emit('onYellow')
    }
    blockSignals = true;
  })
  socket.on('onRed', function() {
    if (!blockSignals) {
      io.emit('onRed')
    }
    blockSignals = true;
  })
  socket.on('off', function() {
    blockSignals = false;
    io.emit('off')
  })
  socket.on('offYellow', function() {
    blockSignals = false;
    io.emit('offYellow')
  })
  socket.on('offRed', function() {
    blockSignals = false;
    io.emit('offRed')
  })
})
