const { secret, key } = require('./config');

const statusCode = 401;
module.exports = server => {
  console.log('Hooking /auth');
  server.post('/auth', (req, res) => {
    if (req.body.secret === secret) {
      res.json({ key });
    } else {
      res.statusCode = statusCode;
      res.json({ statusCode });
    }
  });
  return server;
}
