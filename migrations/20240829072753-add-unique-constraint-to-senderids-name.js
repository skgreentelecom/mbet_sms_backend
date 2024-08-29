'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Senderids', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true, // Add the unique constraint
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Senderids', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false, // Remove the unique constraint if rolled back
    });
  },
};
