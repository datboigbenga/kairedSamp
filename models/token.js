'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Token.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          allowNull: false
        },
        as: 'tokens'
      });
    }
  }
  Token.init({
    ip: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
    userAgent: DataTypes.STRING,
    isValid: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      field: 'createdAt',
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updatedAt',
    },
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};