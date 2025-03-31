const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },

    birthday: {
        type: Date,
        required: true
    },

    isVerify: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('users', user , 'users');