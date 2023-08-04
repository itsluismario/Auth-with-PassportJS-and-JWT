const jwt = require('jsonwebtoken');
const { config: { jwtSecret } } = require('./config/config');

const secret = jwtSecret;

const jwtConfig = {
  expiresIn: '1m',
};

const payload = {
  sub: 1,
  role: 'customer'
}

function signToken(payload, secret) {
  return jwt.sign(payload, secret, jwtConfig);
}

const token = signToken(payload, secret);
console.log(token);
