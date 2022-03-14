"use strict";
const express = require('express');
const router = express.Router()
const basicAuth = require('../middleware/basic');

router.post('/signin', basicAuth, (req, res) => {
    res.status(200).json(req.User);
})
module.exports = router;