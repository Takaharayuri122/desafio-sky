/* eslint-disable no-undef */
require('dotenv').config();
const express = require('express');
const app = express();
const AuthenticationController = require('./src/controllers/AuthenticationController');

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));


app.use('/', AuthenticationController);


app.listen(process.env.PORT);