const express = require('express');
const app = express();
const login = require('./login/login');
const register = require('./register/register');
const clients = require('./clients/clients');

app.use('/', login);
app.use('/', register);
app.use('/', clients);

module.exports = app;