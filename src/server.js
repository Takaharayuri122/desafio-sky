const express = require('express');
const app = express();
const AuthenticationController = require('./controllers/AuthenticationController');

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));


app.use('/', AuthenticationController);

module.exports = app;
