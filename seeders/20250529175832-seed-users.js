'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        password: await bcrypt.hash('admin123', 10),
        created_at: new Date()
      },
      {
        username: 'user1',
        password: await bcrypt.hash('password123', 10),
        created_at: new Date()
      },
      {
        username: 'user2',
        password: await bcrypt.hash('password456', 10),
        created_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};