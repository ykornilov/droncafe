//const menu = require('./menu');
const menu = require('./src/menu');

//menu.read()
//    .then(console.log);
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

// Routing
app.use('/client', express.static('client_ui'));
app.use('/kitchen', express.static('cook_ui'));

// Define namespaces for klient_ui and cook_ui
const cook = io.of('/kitchen');
const user = io.of('/client');

user.on('connection', socket => {
    console.log('a client connection');

    socket.on('login', user => {
        console.log(user);
        socket.emit('auth');
    });
});

cook.on('connection', socket => {
    console.log('a cook connection');
});

server.listen(port, function() {
    console.log(`listening on port: ${server.address().port}`);
});


