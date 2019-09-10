const express = require('express');
const accountsRouter = require('./_accounts/accountsRouter.js')

const server = express();

server.use(express.json());
server.use('/api/accounts', accountsRouter)

module.exports = server;
