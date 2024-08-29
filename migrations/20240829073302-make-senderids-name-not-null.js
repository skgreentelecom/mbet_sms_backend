'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Senderids', 'name', {
      type: Sequelize.STRING,
      allowNull: false, // Set name as NOT NULL
      unique: true, // Ensure name is unique
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Senderids', 'name', {
      type: Sequelize.STRING,
      allowNull: true, // Allow name to be NULL if migration is rolled back
      unique: true,
    });
  },
};
