'use strict';

const fs = require('fs');
const path = './app/src/menu.json';

function read() {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, contents) => {
            if (err) {
                return reject(err);
            }
            resolve(JSON.parse(contents));
        });
    });
}

module.exports = {
    read
};
