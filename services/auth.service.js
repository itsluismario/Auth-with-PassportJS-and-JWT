const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const { config: { jwtSecret, mailerUser, mailerPass } } = require('./../config/config');
const secret = jwtSecret;
const UsersService = require('./users.service');
const service = new UsersService();

class AuthService {

  async getUser(email, password) {
      const user = await service.findByEmail(email);
      if (!user) {
        throw boom.unauthorized();
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw boom.unauthorized();
      }
      delete user.dataValues.password;
      return user;
  }

  signToken(user) {
    const jwtConfig = {
      expiresIn: '30m',
    };

    const payload = {
      sub: user.id,
      role: user.role
    }

    const token = jwt.sign(payload, secret, jwtConfig);
    return {
      user,
      token
    };
  }

  async sendRecovery(email) {
    const jwtConfig = {
      expiresIn: '30m',
    };

    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const payload = { sub: user.id };
    const token = jwt.sign(payload, secret, jwtConfig);
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await service.update(user.id, {recoveryPassword: token});
    // send mail with defined transport object
    const mail = {
      from: mailerUser, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Email to recover password", // Subject line
      html: `<b>Click this link to recover the password ${link}</b>`, // html body
    };

    const response = await this.sendMail(mail);
    return response;
  }

  async sendMail(infoMail) {

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: mailerUser,
          pass: mailerPass
      }
    });

    // send mail with defined transport object
    await transporter.sendMail(infoMail);
    return { message: 'mail sent' };
  }
}

module.exports = AuthService;
