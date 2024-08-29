'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  });

  Role.associate = function(models) {
    Role.hasMany(models.User, {
      foreignKey: 'roleId',
      as: 'users',
    });
    Role.belongsToMany(models.Permission, {
      through: 'RolePermission',
      as: 'permissions',
      foreignKey: 'roleId',
    });
  };

  return Role;
};
