'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    name: {
        type: String,
        default: 'anonym',
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is empty'],
        match: /\w+@\w+\.\w+/,
        index: true,
        unique: true
    },
    balance: {
        type: Number,
        default: 100
    }
});

//const ClientSchema = new Schema({
//    name: String,
//    email: String,
//    balance: {
//        type: Number,
//        default: 100
//    }
//});

module.exports = ClientSchema;