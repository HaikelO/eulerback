module.exports = function (app, port) {
    require('../users/routes')(app);
    require('../network/routes')(app, port);
    require('../teachers/routes')(app);
};