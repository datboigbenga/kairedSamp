'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      phoneNo: {
        type: Sequelize.STRING
      },
      interests: {
        type: Sequelize.ARRAY(Sequelize.ENUM({
          values:["Professional Development", "Health and Wellness", "Personal Growth", "Technology and Innovation", "Creativity and Arts", "Others"]
        }))
      },
      nationalty: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        // allowNull:false,
          references: {
            model: 'Users', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
  
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
    await queryInterface.dropTable('Profiles');
  }
};