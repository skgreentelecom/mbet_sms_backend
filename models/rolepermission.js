'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const RolePermission = sequelize.define('RolePermission', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    roleId: {
      type: DataTypes.UUID,
      references: {
        model: 'Role',
        key: 'id',
      },
    },
    permissionId: {
      type: DataTypes.UUID,
      references: {
        model: 'Permission',
        key: 'id',
      },
    },
  });

  return RolePermission;
};
