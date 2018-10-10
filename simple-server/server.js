const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');

const hookController = require('./controller');
const { controller } = require('./auth');

const app = express();

app.use(cors());
app.use(bodyParser.json());

hookController(app);
controller(app);

module.exports = app;
