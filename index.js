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
const server = app.listen(port, function () {
    console.log("App listening on port " + port);
});

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
});


app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

require('./src/router')(app);

module.exports = app;