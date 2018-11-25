module.exports = function (app) {
    require('../users/routes')(app);
    require('../network/routes')(app);
    require('../teachers/routes')(app);
};