const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:  String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema, 'user')

module.exports = User;
