const InfoRoutes = (app, port) => {
    app.get('/api/port', (req, res)=> {
        res.json({port});
    });
};

module.exports = InfoRoutes;