// @ts-check

const messages = require('./messages');
//const notify = require('./notify');
//const auth = require('./auth');
//const { server } = require('../config');
const { Router } = require('express');

const api = Router();

const createRoutes = () => {
    //api.use('/notify', auth(server.API_AUTHORIZATION));
    //api.post('/notify', notify(adapter, bot));
    api.post('/messages', messages());
    return api;
};

module.exports = {
    createRoutes,
};
