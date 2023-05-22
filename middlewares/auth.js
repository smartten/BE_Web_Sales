require('dotenv').config();

const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function required(req, res, next) {
    if (Object.keys(req.headers).length >0 && req.headers.hasOwnProperty('authorization')) {
        try {
            let token = req.headers.authorization.split(" ")[1]
            const decoded = await jwt.verify(token, process.env.JWT_KEY);
            console.log('decoded', decoded);
            req.userId = decoded.id;
            if (!req.userId) {
                res.status(401).json({
                    error: {
                        Body: ['token have troble']
                    }
                });
            } else {
                next();
            }
        }
        catch (err) {
            console.log('asdfasd', err)
            res.status(401).json({
                error: {
                    Body: ['Failed to authenticate token!']
                }
            });
        }
    } else {
        return res.status(401).json({
            error: {
                Body: ['No token!']
            }
        });
    }
}

async function isAdmin(req, res, next) {    
    if (Object.keys(req.headers).length >0 && req.headers.hasOwnProperty('authorization')) {
        try {
            let token = req.headers.authorization.split(" ")[1]
            const decoded = await jwt.verify(token, process.env.JWT_KEY);
            console.log('decoded' , decoded);
            
            req.userId = decoded.role;
            console.log('decoded', decoded)
            if (decoded.role === 'admin') {
                next();
            } else {
                res.status(401).json({
                    error: {
                        Body: ['token have trouble']
                    }
                });
            }
        }
        catch (err) {
            console.log('asdfasd', err)
            res.status(401).json({
                error: {
                    Body: ['Failed to authenticate token!']
                }
            });
        }
    } else {
        return res.status(401).json({
            error: {
                Body: ['No token!']
            }
        });
    }
}

async function options(req, res, next) {
    try {
        let token = req.headers.authorization.split(" ")[1]
        const decoded = await jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.id;//???????
        next();
    }
    catch (err) {
        next();
    }
}

module.exports = { required, options, isAdmin }