const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const path = require('path');

const env = dotenvExpand(dotenv.config({ path: path.resolve(__dirname, '../')}));

module.exports = {
  host: process.env.RC_MONGO_HOST || 'localhost',
  port: process.env.RC_MONGO_PORT || 27017,
  database: process.env.RC_MONGO_DB || 'docker-workshop',
  authPath: process.env.RC_AUTH_PATH,
  authKey: process.env.RC_AUTH_KEY,
  authSecret: process.env.RC_AUTH_SECRET,
};
