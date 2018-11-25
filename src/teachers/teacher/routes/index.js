const TeacherRoutes = (app) => {
    app.use('/api/teacher', (req, res)=>{
        console.log('/teacher');
        res.json({name:'toto', lastname:'ezezeze'});
    });
};

module.exports = TeacherRoutes;