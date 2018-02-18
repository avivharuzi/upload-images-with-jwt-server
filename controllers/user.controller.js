const User = require('./../models/user.model');

class UserController {
    static setUser(user) {
        return new Promise((resolve, reject) => {
            User.create(user, (err, newUser) => {
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
                userName: user.userName,
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
}

module.exports = UserController;
