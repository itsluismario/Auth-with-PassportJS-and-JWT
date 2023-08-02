const boom = require('@hapi/boom');
const { config: { apiKey } } = require('./../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if ( apiKey === apiKey ) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

module.exports = { checkApiKey }
