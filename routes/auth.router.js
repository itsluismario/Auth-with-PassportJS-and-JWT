const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const { loginAuthSchema } = require('../schemas/auth.schema');
const jwt = require('jsonwebtoken');
const { config: { jwtSecret } } = require('./../config/config');
const secret = jwtSecret;
const router = express.Router();

router.post('/login',
  validatorHandler(loginAuthSchema, 'body'),
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;

      const jwtConfig = {
        expiresIn: '30m',
      };

      const payload = {
        sub: user.id,
        role: user.role
      }

      const token = jwt.sign(payload, secret, jwtConfig);
      res.json({
        user,
        token
      });

    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
