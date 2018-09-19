var AuthController = require('./controller');

function AuthRoutes(app) {
    app.post('/api/login', function (req, res) {
        AuthController.login(req, res);
    });
};

module.exports = AuthRoutes;