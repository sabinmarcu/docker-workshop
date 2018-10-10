const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');

const handler = require('./handler');
const controller = require('./controller');

const app = express();

app.use(cors());
app.use(bodyParser.json());

controller(app);

console.log('Hooking /test');
app.get('/test', handler, (req, res) => {
  res.json({ message: 'SUCCESS' });
});

module.exports = app;
