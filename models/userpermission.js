'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const UserPermission = sequelize.define('UserPermission', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'User',
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

  UserPermission.associate = function(models) {
    UserPermission.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    UserPermission.belongsTo(models.Permission, {
      foreignKey: 'permissionId',
      as: 'permission',
    });
  };

  return UserPermission;
};
