'use strict';

const { config: { adminPass, admimEmail } } = require('./../../config/config');

const { USER_TABLE } = require('../models/user.model');

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    const hash = await bcrypt.hash(adminPass, 10);
    const now = Sequelize.literal('CURRENT_TIMESTAMP');
    await queryInterface.bulkInsert(USER_TABLE, [
      {
        email: admimEmail,
        password: hash,
        role: 'admin',
        created_at: now,
        updated_at: now
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(USER_TABLE, { username: 'admin' }, {});
  }
};
