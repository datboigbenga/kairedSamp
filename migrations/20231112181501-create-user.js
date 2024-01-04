'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      userName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM,
        values: ['user', 'admin'],
        defaultValue: "user",
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      passwordChangedAt: {
        type: Sequelize.DATE
      },
      verification_Token: {
        type: Sequelize.STRING
      },
      is_Verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      verification_Date: {
        type: Sequelize.DATE
      },
      passwordToken: {
        type: Sequelize.STRING
      },
      passwordTokenExpirationDate:{
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};