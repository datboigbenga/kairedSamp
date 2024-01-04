'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * */
     await queryInterface.bulkInsert('Users', [{
        email: "kairedapp@gmail.com",
        userName: 'John_Doe',
        password:"hashhh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "ceo@gmail.com",
        userName: 'John',
        password:"hashhh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "boss@gmail.com",
        userName: 'Mark_Doe',
        password:"hashhh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "gbenhga@gmail.com",
        userName: 'Joy',
        password:"hashhh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     *  */
    await queryInterface.bulkDelete('Users', null, {});
    
  }
};
