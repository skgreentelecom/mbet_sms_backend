'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Permissions', [
      {
        id: uuidv4(),
        name: 'create_user',
        description: 'Permission to create a user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'edit_user',
        description: 'Permission to edit a user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'delete_user',
        description: 'Permission to delete a user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'view_user',
        description: 'Permission to view user details',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more permissions as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Permissions', null, {});
  }
};


