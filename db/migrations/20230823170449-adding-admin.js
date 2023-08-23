'use strict';

const { config: { adminPass } } = require('./../../config/config');

const { USER_TABLE } = require('../models/user.model');

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    const hash = await bcrypt.hash(adminPass, 10);
    await queryInterface.bulkInsert(USER_TABLE, [
      {
        email: 'helloluismario@gmail.com',
        password: hash,
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(USER_TABLE, { username: 'admin' }, {});
  }
};
