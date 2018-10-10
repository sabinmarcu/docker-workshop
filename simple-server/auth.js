const { authKey, authSecret, authPath } = require('./config');

const nullController = server => server
if (authKey && authPath) {
  const { authHandler, authController } = require(authPath);
  module.exports = {
    middleware: [ authHandler ],
    controller: authSecret ? server => authController(server) : nullController,
  }
} else {
  module.exports = {
    middleware: [],
    controller: nullController,
  }
}
