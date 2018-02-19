const User = require('./../models/user.model');
const validationHandler = require('./../handlers/validation.handler');

class UserController {
    static setUser(user) {
        return new Promise((resolve, reject) => {
            User.create({
                userName: user.userName.toLowerCase(),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email.toLowerCase(),
                password: user.password,
            }, (err, newUser) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(newUser);
                }
            });
        });
    }

    static checkUser(user) {
        return new Promise((resolve, reject) => {
            User.findOne({
                userName: user.userName.toLowerCase(),
                password: user.password
            }, (err, userExist) => {
                if (err) {
                    reject(err);
                } else {
                    if (userExist !== null) {
                        resolve(userExist);
                    } else {
                        reject(['The username or password you have entered is invalid']);
                    }
                }
            });
        });
    }

    static validateUser(user) {
        return new Promise((resolve, reject) => {
            let errors = [];

            if (!validationHandler.regex(user.userName.toLowerCase(), /^[a-z0-9_]{2,55}$/)) {
                errors.push('Username is invalid');
            }

            if (!validationHandler.regex(user.firstName, /^[A-Za-z]{2,30}$/)) {
                errors.push('First name is invalid');
            }

            if (!validationHandler.regex(user.lastName, /^[A-Za-z]{2,30}$/)) {
                errors.push('Last name is invalid');
            }

            if (!validationHandler.regex(user.email.toLowerCase(), /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/)) {
                errors.push('Email is invalid');
            }

            if (!validationHandler.regex(user.password, /^[A-Za-z0-9!@#$%^&*()_]{6,55}$/)) {
                errors.push('Password is invalid');
            }

            if (errors.length) {
                reject(errors);
            } else {
                UserController.checkUserByUserName(user)
                    .then(UserController.checkUserByEmail)
                    .then(() => resolve(user))
                    .catch(err => reject(err));
            }
        });
    }

    static checkUserByUserName(user) {
        return new Promise((resolve, reject) => {
            User.findOne({
                userName: user.userName.toLowerCase()
            }, (err, userExist) => {
                if (err) {
                    reject(err);
                } else {
                    if (userExist !== null) {
                        reject(['This username is already in used']);
                    } else {
                        resolve(user);
                    }
                }
            });
        });
    }

    static checkUserByEmail(user) {
        return new Promise((resolve, reject) => {
            User.findOne({
                email: user.email.toLowerCase()
            }, (err, userExist) => {
                if (err) {
                    reject(err);
                } else {
                    if (userExist !== null) {
                        reject(['This email is already in used']);
                    } else {
                        resolve(user);
                    }
                }
            });
        });
    }
}

module.exports = UserController;
