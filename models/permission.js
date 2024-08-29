'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  });

  Permission.associate = function(models) {
    Permission.belongsToMany(models.Role, {
      through: 'RolePermission',
      as: 'roles',
      foreignKey: 'permissionId',
    });
  };

  return Permission;
};
