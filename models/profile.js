'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          allowNull: false
        },
        as: 'profile'
      });
    }
  }
  Profile.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNo: DataTypes.STRING,
    interests: DataTypes.ARRAY(DataTypes.ENUM({
      values: ["Professional Development",
                "Health and Wellness",
                "Personal Growth",
                "Technology and Innovation",
                "Creativity and Arts",
                "Others"]
    })),
    nationalty: DataTypes.STRING,
    city: DataTypes.STRING,
    avatar: DataTypes.STRING,
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
    modelName: 'Profile',
  });
  return Profile;
};