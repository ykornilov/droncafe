'use strict';

function deliver(client, dish) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (randInt(0, 1)) {
                dish.status = 4;
                resolve({
                    client,
                    dish
                });
            } else {
                dish.status = 3;
                client.balance += dish.cost;
                reject ({
                    client,
                    dish
                })
            }
        }, randInt(5000, 15000));
    });
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
    deliver
};