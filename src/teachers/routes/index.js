const TeachersRoutes = (app) => {
    require('../teacher/routes')(app);

    app.use('/api/teachers', (req, res)=>{
        console.log('/teacher');
        res.json([{name:'toto'},{name:'tata'},{name:'tete'}]);
    });
};

module.exports = TeachersRoutes;