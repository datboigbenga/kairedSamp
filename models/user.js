'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require("bcrypt")

// UserSchema.pre("save", async function(){
//   if(!this.isModified('password')) return; 
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt)
// })

// UserSchema.methods.comparePass = async function(inputtedPass){
//   const ismatch = bcrypt.compare(inputtedPass, this.password)
//   return ismatch
// }
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, {
        foreignKey: {
          name: 'userId',
          allowNull: false
        },
        as: 'profile'
      });

      User.hasOne(models.Token, {
        foreignKey: {
          name: 'userId',
          allowNull: false
        },
        as: 'token'
      });

    }
    
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      
    },
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'admin']
    },
    active: DataTypes.BOOLEAN,
    passwordChangedAt: DataTypes.DATE,
    verification_Token: DataTypes.STRING,
    is_Verified: DataTypes.BOOLEAN,
    verification_Date: DataTypes.DATE,
    passwordToken: DataTypes.STRING,
    passwordTokenExpirationDate: DataTypes.DATE,
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
  },

  {
    hooks: {
      beforeValidate: async function (user){
        if(user.previous('password') == user.password) return; 
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    instanceMethods: {
      validPassword: async function() {
        console.log("eyooo")
        // return bcrypt.compare(password, this.password);
      }
    },    

    sequelize,
    modelName: 'User',
  });
  // User.prototype.hey = function(){
  //   console.log("sjjj")
  // }
  return User;
};