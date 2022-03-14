"use strict";

const server = require('./src/server')
const { DB } = require('./src/auth/models/index')

require('dotenv').config();
DB.sync().then(() => {
    server.start(process.env.PORT || 3030)
})