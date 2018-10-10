const { key } = require('./config');

const statusCode = 401;
module.exports = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization === `Bearer ${key}`) {
    next();
  } else {
    res.statusCode = statusCode;
    res.json({ statusCode, message: 'Not Authorized' });
  }
}
