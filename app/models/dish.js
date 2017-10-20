'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DishSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    cost: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    client_id: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    }
});

module.exports = DishSchema;