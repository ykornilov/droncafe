const menu = require('./app/src/menu');

//menu.read()
//    .then(console.log);
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

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

mongoose.connect('mongodb://localhost:27017/droncafe', {
        useMongoClient: true
        /* other options */
    })
    .then(db => {
        console.log('Connected to database');

        const ClientSchema = require('./app/models/client');
        const Client = mongoose.model('Client', ClientSchema);


        user.on('connection', socket => {
            console.log('a client connection');

            socket.on('login', client => {
                if (client.email === null) {
                    return;
                }
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
                    .then(() => Client.findOne({email: client.email}))
                    .then(res => {
                        socket.user = res;
                        socket.emit('auth', res);
                    })
                    .catch(console.log);
            });

            socket.on('incBalance', () => {
                Client.findOne({ email: socket.user.email })
                    .exec()
                    .then(client => {
                        client.balance += 100;
                        return client.save();
                    })
                    .then(res => socket.emit('changeBalance', res.balance))
                    .catch(console.log);
            });

            socket.on('getMenu', () => {
                menu.read()
                    .then(res => {
                        socket.emit('menu', res);
                    })
                    .catch(console.log);
            });

            socket.on('addOrder', dish => {
                Client.findOne({ email: socket.user.email })
                    .exec()
                    .then(client => {
                        client.balance -= dish.cost;
                        return client.save();
                    })
                    .then(res => socket.emit('changeBalance', res.balance))
                    .catch(console.log);
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



