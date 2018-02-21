const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        index: true,
        unique: true,
        required: true,
        trim: true
    },
    firstName: String,
    lastName: String,
    email: {
        type: String,
        index: true,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function (next) {
    let user = this;

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    let user = this;

    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });
};

const User = mongoose.model('User', userSchema, 'user')

module.exports = User;
