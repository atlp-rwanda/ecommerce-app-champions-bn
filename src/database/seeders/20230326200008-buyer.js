/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Buyers', [
    {
    UserId: 4,
    createdAt:new Date(),
    updatedAt:new Date()
   },
   {
    UserId: 5,
    createdAt:new Date(),
    updatedAt:new Date()
   }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Buyers', null, {});
  }
};
