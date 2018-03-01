const express = require('express');
const router = express.Router();
const RouteHandler = require('./../handlers/route.handler');
const AuthHandler = require('./../handlers/auth.handler');
const UserController = require('./../controllers/user.controller');

router.post('/register', (req, res) => {
    let user = req.body.user;

    if (user) {
        UserController.validateUser(user)
            .then(UserController.setUser)
            .then(() => RouteHandler.success(res, 'You registered successfully'))
            .catch(err => RouteHandler.error(res, 409, 'There was problem by registering the user', err));
    }
});

router.post('/login', (req, res) => {
    let user = req.body.user;

    if (!user) {
        res.status(404).end();
    } else {
        UserController.checkUser(user)
            .then(AuthHandler.signUserToJwt)
            .then(token => {
                res.setHeader('authorization', token);
                RouteHandler.success(res, 'User found', token);
            })
            .catch(err => RouteHandler.error(res, 404, 'User is not exist', err));
    }
});

router.post('/check', (req, res) => {
    let token = req.body.token;

    if (!token) {
        res.status(404).end();
    } else {
        AuthHandler.checkUserToken(token)
            .then(() => RouteHandler.success(res, 'Token verify', token))
            .catch(() => res.status(401).end());
    }
});

module.exports = router;
