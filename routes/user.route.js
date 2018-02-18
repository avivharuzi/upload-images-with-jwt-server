const express = require('express');
const router = express.Router();
const routeHandler = require('./../handlers/route.handler');
const authHandler = require('./../handlers/auth.handler');
const userController = require('./../controllers/user.controller');

router.post('/register', (req, res) => {
    let user = req.body.user;
    if (user) {
        userController.setUser(user)
            .then(() => routeHandler.success(res, 'You registered successfully'))
            .catch(err => routeHandler.error(res, 409, 'There was problem by registering the user', err));
    }
});

router.post('/login', (req, res) => {
    let user = req.body.user;

    if (!user) {
        res.status(404).end();
    } else {
        userController.checkUser(user)
            .then(authHandler.signUserToJwt)
            .then(token => {
                res.setHeader('authorization', token);
                routeHandler.success(res, 'User found', token);
            })
            .catch(err => routeHandler.error(res, 404, 'User is not exist', err));
    }
});

module.exports = router;
