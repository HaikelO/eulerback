// Set up
// ======================================================================
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const serverConf = require('./config/server');
const databaseConf = require('./config/database');
const bodyParser = require('body-parser');
const ExpressPeerServer = require('peer').ExpressPeerServer;

/* var Peer = require('simple-peer'); */
/* var wrtc = require('wrtc'); */

const router = express.Router();
const port = serverConf.port;
const ioPort = serverConf.ioPort;

/* var io = require('socket.io')(ioPort);
var ss = require('socket.io-stream');

var peer1 = new Peer({ initiator: true, wrtc: wrtc });
var peer2 = new Peer({ wrtc: wrtc }); */

// Configuration
// ======================================================================
const server = app.listen(9000);

const options = {
  debug: true
}

const peerserver = ExpressPeerServer(server, options);

app.use('/api', peerserver);

mongoose.connect(databaseConf.url, { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());

peerserver.on('connection', (id) => {
  console.log('NEW CONNECTION', id);
  const conn = peerserver.connect(id);
  
});
peerserver.on('data', (data) => {
  console.log('data', data);
});

/* io.of('/user').on('connection', (client) => {
    console.log('New client');
    ss(client).on('stream', function(stream, data) {
        console.log('stream', stream);
        console.log('data', data);
      });
}); */

/* peer1.on('signal', function (data) {
    // when peer1 has signaling data, give it to peer2 somehow
    peer2.signal(data);
});

peer2.on('signal', function (data) {
    // when peer2 has signaling data, give it to peer1 somehow
    peer1.signal(data);
});

peer1.on('connect', function () {
    // wait for 'connect' event before using the data channel
    peer1.send('hey peer23, how is it going?');
});

peer2.on('data', function (data) {
    // got a data channel message
    console.log('got a message from peer1: ' + data);
});

io.sockets.on('connection', function (socket) {
    console.log('New Client');
    socket.on('stream', function (data) {
        console.log('New Streamer', data);
        socket.emit('capture', data);
    });    
});
 */
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

require('./src/router')(app);

server.listen(port, function () {
  console.log("App listening on port " + port);
});

module.exports = app;