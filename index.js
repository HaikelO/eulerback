// Set up
// ======================================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var serverConf = require('./config/server');
var databaseConf = require('./config/database');
var bodyParser = require('body-parser');



var router = express.Router();
var port = serverConf.port;
var ioPort = serverConf.ioPort;

var io = require('socket.io')(ioPort);
var ss = require('socket.io-stream');
// Configuration
// ======================================================================
mongoose.connect(databaseConf.url, { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());

io.of('/user').on('connection', (client) => {
    console.log('New client');
    ss(client).on('stream', function(stream, data) {
        console.log('stream', stream);
        console.log('data', data);
      });
});

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

require('./routes.js')(app);

app.listen(port, function () {
    console.log("App listening on port " + port);
});

module.exports = app;