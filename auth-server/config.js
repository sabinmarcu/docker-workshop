const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const path = require('path');

const env = dotenvExpand(dotenv.config({ path: path.resolve(__dirname, '../')}));

module.exports = {
  secret: process.env.RC_AUTH_SECRET || 'potato',
  key: process.env.RC_AUTH_KEY || "banana",
};
