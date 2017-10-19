//const menu = require('./menu');
const menu = require('./src/menu');

//menu.read()
//    .then(console.log);
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

const Client = require('./app/models/client');

// Routing
app.use('/client', express.static('client_ui'));
app.use('/kitchen', express.static('cook_ui'));

// Define namespaces for klient_ui and cook_ui
const cook = io.of('/kitchen');
const user = io.of('/client');

mongoose.connect('mongodb://localhost:27017/droncafe', {
        useMongoClient: true
        /* other options */
    })
    .then(db => {
        console.log('Connected to database');

        const client = {
            name: 'Ivan',
            email: 'ivan@ivan.ru'
        };

        Client.findOneAndUpdate({
                    email: client.email
                }, {
                    $set: {name: client.name},
                    $setOnInsert: {email: client.email}
                }, {
                    upsert: true,
                    setDefaultsOnInsert: true
                })
            .exec()
            .then(res => {
                console.log("got any results");
                console.log(res);
            })
            .catch(console.log);

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

    })
    .catch(console.log);

server.listen(port, function() {
    console.log(`listening on port: ${server.address().port}`);
});


