// models/senderid.js

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Senderid extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  Senderid.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure name is unique
        validate: {
          notEmpty: true, // Ensure name is not an empty string
        },
      },
      desc: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'inactive',
      },
      admin_status: {
        type: DataTypes.ENUM('pending', 'active', 'rejected', 'deleted'),
        allowNull: false,
        defaultValue: 'pending',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Senderid',
      tableName: 'Senderids',
    }
  );

  return Senderid;
};
