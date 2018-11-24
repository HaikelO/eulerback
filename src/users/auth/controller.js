const AuthController = {
    login(req, res) {
        console.log('req', req);
        res.json({ status: 'ok', info: { firstName: 'Tony', lastName: 'Montana' } });
    }
}

module.exports = AuthController;