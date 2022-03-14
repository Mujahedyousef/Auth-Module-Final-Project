"use strict";
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    res.status(200).json("Welcome in Home page.")
})


function start(port) {
    app.listen(port, () => {
        console.log(`The server running on https://localhost:${port}`);
    })
}

module.express = {
    start: start,
    app: app
}