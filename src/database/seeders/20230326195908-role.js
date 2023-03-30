/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Roles', [
      {
       roleName: 'admin',
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
        roleName: 'vendor',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        roleName: 'buyer',
        createdAt: new Date(),
        updatedAt: new Date()
       }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};