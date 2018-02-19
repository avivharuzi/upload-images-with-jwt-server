const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        index: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    email: {
        type: String,
        index: true,
        unique: true
    },
    password: String,
});

const User = mongoose.model('User', userSchema, 'user')

module.exports = User;
