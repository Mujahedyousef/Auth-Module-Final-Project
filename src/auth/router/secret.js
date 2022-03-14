"use strict";
const bearer = require("../middleware/bearer");
const express = require('express');
const router = express.Router();

router.get('/secret', bearer, (req, res) => {
    res.status(200).json({
        'message': 'Correct Login',
        'user': req.user
    });
})

module.exports = router;