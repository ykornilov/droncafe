const menu = require('./app/src/menu');
const netologyFakeDroneApi = require('./app/src/netology-fake-drone-api');

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
const nskitchen = io.of('/kitchen');
const nsclient = io.of('/client');

mongoose.connect('mongodb://localhost:27017/droncafe', {
        useMongoClient: true
        /* other options */
    })
    .then(db => {
        console.log('Connected to database');

        const ClientSchema = require('./app/models/client');
        ClientSchema.post('save', function(client) {
            sendToClient(client._id, 'client', client);
        });
        const Client = mongoose.model('Client', ClientSchema);

        const DishSchema = require('./app/models/dish');
        DishSchema.post('save', function(dish) {
            sendToClient(dish.client_id, 'order', dish);

            switch (dish.status) {
                case 0:
                case 1:
                    sendToCooks('order', dish);
                    break;
                case 2:
                    sendToCooks('order', dish);
                    deliverDish(dish);
                    break;
                case 3:
                case 4:
                    setTimeout(function() {
                        dish.remove();
                    }, 120000);
                    break;
            }
        });
        DishSchema.post('remove', function(dish) {
            sendToClient(dish.client_id, 'remove', dish);
        });
        const Dish = mongoose.model('Dish', DishSchema);

        nsclient.on('connection', socket => {
            console.log('a client connection');

            socket.on('login', user => {
                if (user.email === null) {
                    return;
                }
                Client.findOneAndUpdate({
                        email: user.email
                    }, {
                        $set: {name: user.name},
                        $setOnInsert: {email: user.email}
                    }, {
                        upsert: true,
                        setDefaultsOnInsert: true
                    })
                    .exec()
                    .then(() => Client.findOne({email: user.email}))
                    .then(res => {
                        socket.user = res;
                        socket.emit('auth', res);
                    })
                    .catch(console.log);
            });

            socket.on('incBalance', () => {
                Client.findOne({ email: socket.user.email })
                    .exec()
                    .then(user => {
                        user.balance += 100;
                        return user.save();
                    })
                    .catch(console.log);
            });

            socket.on('getMenu', () => {
                menu.read()
                    .then(res => {
                        socket.emit('menu', res);
                    })
                    .catch(console.log);
            });

            socket.on('getOrders', () => {
                Dish.find({ client_id: new mongoose.Types.ObjectId(socket.user._id) })
                    .exec()
                    .then(res => socket.emit('orders', res))
                    .catch(console.log);
            });

            socket.on('newOrder', dish => {
                Dish.create({
                        title: dish.title,
                        cost: dish.cost,
                        client_id: socket.user._id
                    })
                    .then(() => Client.findOne({ email: socket.user.email }))
                    .then(user => {
                        user.balance -= dish.cost;
                        return user.save();
                    })
                    .catch(console.log);
            });
        });

        nskitchen.on('connection', socket => {
            console.log('a cook connection');

            socket.on('getOrders', () => {
                Dish.find({})
                    .exec()
                    .then(res => socket.emit('orders', res))
                    .catch(console.log);
            });

            socket.on('changeStatusOrder', ({order, status}) => {
                Dish.findOne({ _id: new mongoose.Types.ObjectId(order._id) })
                    .exec()
                    .then(dish => {
                        dish.status = status;
                        return dish.save();
                    })
                    .catch(console.log);
            });
        });

        function deliverDish(dish) {
            Client.findOne({ _id: dish.client_id })
                .then(client => netologyFakeDroneApi.deliver(client, dish))
                .then(({client, dish}) => {
                    dish.save();
                })
                .catch(({client, dish}) => {
                    dish.save();
                    client.save();
                })
        }

        function sendToCooks(eventName, data) {
            nskitchen.clients((error, socketsID) => {
                if (error) throw error;
                socketsID.forEach(socketID => {
                    const socket = nskitchen.to(socketID);
                    socket.emit(eventName, data);
                });
            });
        }

        function sendToClient(clientId, eventName, data) {
            nsclient.clients((error, socketsID) => {
                if (error) throw error;
                const socketID = socketsID.find(socketID => {
                    const socket = nsclient.connected[socketID];
                    return socket.user && socket.user._id.toString() === clientId.toString();
                });
                if (socketID) {
                    nsclient.to(socketID).emit(eventName, data);
                }
            });
        }

    })
    .catch(console.log);

server.listen(port, function() {
    console.log(`listening on port: ${server.address().port}`);
});



