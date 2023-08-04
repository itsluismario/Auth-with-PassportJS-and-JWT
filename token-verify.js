const jwt = require('jsonwebtoken');
const { config: { secretKey } } = require('./config/config');

const secret = secretKey;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY5MTE2MDgxOCwiZXhwIjoxNjkxMTYwODc4fQ.Efjd7vP0HcC6Xbjo1n2920UYgYOCyDPRRT9IDOW3JyQ';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
