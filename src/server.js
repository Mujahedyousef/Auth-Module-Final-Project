"use strict";
const express = require('express');
const app = express();
const cors = require('cors');
const notFound = require('./errorHandler/404');
const errorHandler = require('./errorHandler/404');
const signup = require('./auth/router/signup');
const signin = require('./auth/router/signin');
const secret = require('./auth/router/secret');
const V1Router = require('./auth/router/V1Router')
const V2Router = require('./auth/router/V2Router')
const bcrypt = require('bcrypt');
const bearer = require('./auth/middleware/bearer');
const { user } = require('./auth/models');
app.use(express.json());
app.use(cors());
app.use(signup);
app.use(signin);
app.use(secret);
app.use("api/v1", V1Router);
app.use("api/v2", V1Router);




app.get('/', (req, res) => {
    res.status(200).json("Welcome in Home page.")
});

app.get('/users', bearer, async (req, res) => {
    let users = await user.findAll();
    res.status(200).json(users)
});

app.use(errorHandler);
app.use('*', notFound);
function start(port) {
    app.listen(port, () => {
        console.log(`The server running on https://localhost:${port}`);
    })
};


module.exports = {
    app: app,
    start: start
}