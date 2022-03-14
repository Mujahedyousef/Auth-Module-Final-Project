"use strict";
require('dotenv').config();

const server = require('./src/server')
const { DB } = require('./src/auth/models/index')

DB.sync().then(() => {
    server.start(process.env.PORT || 3030)
}).catch(console.error);