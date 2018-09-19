var AuthController = {
    login(req, res) {
        res.json({ status: 'ok', info: { firstName: 'Tony', lastName: 'Montana' } });
    }
}

module.exports = AuthController;