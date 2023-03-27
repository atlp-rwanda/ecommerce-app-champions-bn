/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('ReportedActivities', [{
      category: 'illegal product',
      activity:'promoting prostitution',
      VendorId:1,
      productId:1,
      buyerId:1,
      createdAt: new Date(),
      updatedAt:new Date()
     }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ReportedActivities', null, {});
  }
};
