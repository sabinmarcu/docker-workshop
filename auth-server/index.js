const server = require('./server');
const handler = require('./handler');
const controller = require('./controller');

if (require.main === module) {
  server.listen(3000);
  console.log("Auth server running at guest port 3000");
} else {
  module.exports = {
    authHandler: handler,
    authController: controller,
  }
}
