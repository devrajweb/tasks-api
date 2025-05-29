'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tasks', [
      {
        title: 'Admin Task 1',
        description: 'Complete project setup',
        status: 'pending',
        user_id: 1, // Matches admin user (id: 1)
        created_at: new Date()
      },
      {
        title: 'Admin Task 2',
        description: 'Review documentation',
        status: 'completed',
        user_id: 1, // Matches admin user (id: 1)
        created_at: new Date()
      },
      {
        title: 'User1 Task 1',
        description: 'Write unit tests',
        status: 'pending',
        user_id: 2, // Matches user1 (id: 2)
        created_at: new Date()
      },
      {
        title: 'User2 Task 1',
        description: 'Design UI mockups',
        status: 'pending',
        user_id: 3, // Matches user2 (id: 3)
        created_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});
  }
};