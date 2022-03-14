"use strict";
require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { user } = require('../models/index');
// const bcrypt = require('bcrypt')

const bearer = async (req, res, next) => {
    let bearerAuthText = req.headers.authorization;
    if (bearerAuthText) {
        try {
            let bearerHeadersParts = bearerAuthText.split(' ');
            let token = bearerHeadersParts.pop()
            if (token) {
                let parsedToken = jwt.verify(token, SECRET);
                const User = await user.findOne({ where: { username: parsedToken.username } });
                if (User) {
                    req.token = parsedToken;
                    req.User = User;
                    next()
                } else {
                    res.status(403).send('invalid user')
                }
            }
        } catch (error) {
            res.status(403).send('invalid Token');
        }
    } else {
        res.status(403).send('Empty Token')
    }
}

module.exports = bearer;