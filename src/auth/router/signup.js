"use strict";
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const { user } = require('../models/index')
require('dotenv').config();


router.post('/signup', signUPfunction)

async function signUPfunction(req, res) {
    let userObject = req.body;
    try {
        const hashedPassword = await bcrypt.hash(userObject.password, 5);
        const newUser = await user.create({
            username: userObject.username,
            password: hashedPassword,
            role: userObject.role
        })
        res.status(201).json(newUser)
    } catch (error) {
        console.error;
    }
}
module.exports = router;