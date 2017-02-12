"use strict"
var express = require('express');
var IO = require('socket.io');
var app = express();
var http = require('http').Server(app);
var url = require('url');
var querystring = require('querystring');
var secret = require('./secretToken.js').secret;
var io = IO(http);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
})
app.get('/', function(req, res) {
  res.status(200).send('Halo')
})

http.listen(3000);

io.set('authorization', function(handshake, cb) {
  var query = url.parse(handshake.url).query;
  var token = querystring.parse(query).token;
  if (token === secret) {
    cb(null, true);
  } else {
    console.log('no auth',token, secret)
    cb('Not Authorized, suckaaa!!', false)
  }
})

io.sockets.on('connection', function(socket) {
  console.log('connection made with ' + socket);
  socket.on('flash', function() {
    io.emit('flash')
  })
  socket.on('on', function() {
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
