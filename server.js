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
const nskitchen = io.of('/kitchen');
const nsclient = io.of('/client');

mongoose.connect('mongodb://localhost:27017/droncafe', {
        useMongoClient: true
        /* other options */
    })
    .then(db => {
        console.log('Connected to database');

        const ClientSchema = require('./app/models/client');
        const Client = mongoose.model('Client', ClientSchema);

        const DishSchema = require('./app/models/dish');
        //DishSchema.post('save', function(doc) {
        //    console.log('%s has been saved', doc._id);
        //});
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
                    .then(res => {
                        nskitchen.clients((error, clients) => {
                            if (error) throw error;
                            clients.forEach(client => nskitchen.to(client).emit('order', res));
                        });
                    })
                    .then(() => Client.findOne({ email: socket.user.email }))
                    .then(user => {
                        user.balance -= dish.cost;
                        return user.save();
                    })
                    .then(res => socket.emit('changeBalance', res.balance))
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
                    .then(res => {
                        nskitchen.clients((error, clients) => {
                            if (error) throw error;
                            clients.forEach(client => nskitchen.to(client).emit('order', res));
                        });
                        return res;
                    })
                    .then(res => {
                        nsclient.clients((error, clients) => {
                            if (error) throw error;
                            const client = clients.find(client => nsclient.connected[client].user._id.toString() === res.client_id.toString());
                            if (client) {
                                nsclient.to(client).emit('order', res);
                            }
                        });
                    })
                    .catch(console.log);
            });
        });

    })
    .catch(console.log);

server.listen(port, function() {
    console.log(`listening on port: ${server.address().port}`);
});



