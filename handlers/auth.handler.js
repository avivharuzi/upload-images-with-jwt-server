const jwt = require('jsonwebtoken');

class AuthHandler {
    static authenticate(req, res, next) {
        if (req.method === 'OPTIONS') {
            res.end();
        }
    
        if (req.headers.authorization !== undefined) {
            let token = req.headers.authorization
    
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.status(401).end();
                }

                req.userData = decoded;
                next();
            });
        } else {
            res.status(401).send();
        }
    }

    static signUserToJwt(user) {
        return new Promise((resolve, reject) => {
            jwt.sign(user.toJSON(), process.env.JWT_SECRET, (err, token) => {
                if (err) {
                    reject();
                } else {
                    resolve(token);
                }
            }); 
        });
    }
}

module.exports = AuthHandler;
