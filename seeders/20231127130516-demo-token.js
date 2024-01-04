'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * */
     await queryInterface.bulkInsert('Tokens', [{
      ip: 'dhdhdhdh',
      refreshToken: 'dwggdshqvhjqfvvf',
      userAgent: "iphone",
      isValid: false,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ip: 'dhdhdhdh',
      refreshToken: 'dwggdshqvhjqfvvf',
      userAgent: "iphone",
      isValid: true,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ip: 'dhdhdhdh',
      refreshToken: 'dwggdshqvhjqfvvf',
      userAgent: "iphone",
      isValid: true,
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ip: 'dhdhdhdh',
      refreshToken: 'dwggdshqvhjqfvvf',
      userAgent: "iphone",
      isValid: true,
      userId: 4,
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
     * */
    await queryInterface.bulkDelete('Tokens', null, {});
     
  }
};
