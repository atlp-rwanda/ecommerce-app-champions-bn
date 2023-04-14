/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
          await queryInterface.bulkInsert('Notifications', [{
          subject: 'Product added',
          message:" A product is added into your collection.",
          type:"ProductAdded",
          userId:1,
          createdAt:new Date(),
          updatedAt:new Date()

        }], {});
    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Notifications', null,{});
  }
};
