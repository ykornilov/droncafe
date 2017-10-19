'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    name: {type: String, trim: true},
    email: {type: String, match: /\w+@\w+\.\w+/, index: true, unique: true},
    balance: {type: Number, default: 100}
});

module.exports = mongoose.model('Client', ClientSchema);