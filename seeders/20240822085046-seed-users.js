'use strict';

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get Super Admin role ID
    const [roles] = await queryInterface.sequelize.query(
      `SELECT id FROM Roles WHERE name = 'Super Admin';`
    );
    const superAdminRoleId = roles[0].id;

    // Hash password
    const hashedPassword = await bcrypt.hash('superadminpassword', 10);

    // Create Super Admin user
    await queryInterface.bulkInsert('Users', [
      {
        id: uuidv4(),
        name: 'Super Admin',
        email: 'superadmin@example.com',
        password: hashedPassword,
        roleId: superAdminRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

    // Get all permissions
    const [permissions] = await queryInterface.sequelize.query(
      `SELECT id FROM Permissions;`
    );

    // Assign all permissions to Super Admin role
    const rolePermissions = permissions.map(permission => ({
      id: uuidv4(),
      roleId: superAdminRoleId,
      permissionId: permission.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('RolePermissions', rolePermissions, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('RolePermissions', null, {});
  }
};

