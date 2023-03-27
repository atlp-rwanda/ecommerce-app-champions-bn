/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Categories', [
    {
     name: 'food',
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
    name: 'phones',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'laptops',
    createdAt: new Date(),
    updatedAt: new Date()
  }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
