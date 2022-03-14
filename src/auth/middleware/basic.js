"use strict";
require('dotenv').config()
const base64 = require('base-64');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { user } = require('../models/index');
const bcrypt=require('bcrypt')


const basic = async (req, res, next) => {
    let basicAuthText = req.headers.authorization;
    try {
        if (basicAuthText) {
            let basicHeardersParts = basicAuthText.split(' ');
            let encoded = basicHeardersParts.pop();
            let decode = base64.decode(encoded);
            let [username, password] = decode.split(":")
            const User = await user.findOne({ where: { username: username } });
            const valid = await bcrypt.compare(password, User.password);
            if (valid) {
                req.User=User
                let newToken = jwt.sign({ username: User.username }, SECRET,{expiresIn : 900000})
                User.token = newToken;
                res.status(200).json(User)
                next()
            } else {
                res.status(403).send('invalid sign in Password')
            }
        }

    } catch (error) {
        console.error(`${error}`)
        res.status(403).send('invalid sign in Username')
    }
}

module.exports = basic;