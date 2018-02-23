const User = require('./../models/user.model');
const validationHandler = require('./../handlers/validation.handler');

class UserController {
    static setUser(user) {
        return new Promise((resolve, reject) => {
            const _userName = validationHandler.testInput(user.userName.toLowerCase());
            const _firstName = validationHandler.testInput(user.firstName);
            const _lastName = validationHandler.testInput(user.lastName);
            const _email = validationHandler.testInput(user.email.toLowerCase());
            const _password = validationHandler.testInput(user.password);

            User.create({
                userName: _userName,
                firstName: _firstName,
                lastName: _lastName,
                email: _email,
                password: _password,
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
                userName: user.userName.toLowerCase()
            }, (err, userExist) => {
                if (err) {
                    reject(err);
                } else if (userExist !== null) {
                    userExist.comparePassword(user.password, (error, isMatch) => {
                        if (error) {
                            reject(error);
                        } else if (isMatch) {
                            resolve(userExist);
                        }
                        reject(['The username or password you have entered is invalid']);
                    });
                } else {
                    reject(['The username or password you have entered is invalid']);
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

            if (!validationHandler.isEmail(user.email.toLowerCase())) {
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
