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

io.sockets.on('connection', function(socket) {
  console.log('connection made with ' + socket);
  socket.on('flash', function() {
    io.emit('flash')
  })
  socket.on('dance', function() {
    io.emit('dance')
  })
  socket.on('on', function() {
    console.log('emitting on')
    io.emit('on')
  })
  socket.on('onYellow', function() {
    io.emit('onYellow')
  })
  socket.on('onRed', function() {
    io.emit('onRed')
  })
  socket.on('off', function() {
    io.emit('off')
  })
  socket.on('offYellow', function() {
    io.emit('offYellow')
  })
  socket.on('offRed', function() {
    io.emit('offRed')
  })
})
