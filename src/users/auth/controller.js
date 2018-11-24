let id = 0;
const AuthController = {
    login(req, res) {
        id++;
        res.json({ status: 'ok', info: { firstName: 'Tony', lastName: 'Montana', id } });
    }
}

module.exports = AuthController;