'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * */
     await queryInterface.bulkInsert('Profiles', [{
        firstName: 'John',
        lastName: 'Doe',
        phoneNo: "08137500777",
        interests:Sequelize.literal(`ARRAY['Professional Development']::"enum_Profiles_interests"[]`),
        nationalty: "Nigerian",
        city:"lagos",
        avatar:"pp.jpeg",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Mark',
        lastName: 'Doe',
        phoneNo: "08137500777",
        interests:Sequelize.literal(`ARRAY['Professional Development', 'Health and Wellness']::"enum_Profiles_interests"[]`),
        nationalty: "Nigerian",
        city:"lagos",
        avatar:"pp2.jpeg",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Matthew',
        lastName: 'Doe',
        phoneNo: "08137500777",
        interests: Sequelize.literal(`ARRAY['Creativity and Arts', 'Others']::"enum_Profiles_interests"[]`),
        nationalty: "Nigerian",
        city:"lagos",
        avatar:"pp3.jpeg",
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Joy',
        lastName: 'Doe',
        phoneNo: "08137500777",
        interests:Sequelize.literal(`ARRAY['Professional Development', 'Health and Wellness', 'Personal Growth', 'Technology and Innovation', 'Creativity and Arts', 'Others']::"enum_Profiles_interests"[]`),
        nationalty: "Nigerian",
        city:"lagos",
        avatar:"pp4.jpeg",
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
     *  */
    await queryInterface.bulkDelete('Profiles', null, {});
    
  }
};
