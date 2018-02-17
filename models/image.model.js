const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
    src:  String,
    likes: Number
});

const Image = mongoose.model('Image', imageSchema, 'image')

module.exports = Image;
