const ChatRoutes = (app) => {
    app.get('/api/messages', (req, res)=>{
        console.log('/messages');
        res.json([{message:'Bonjour !'}, {message:'Hello !'}, {message:'C\'est bien ...'}]);
    });
};

module.exports = ChatRoutes;