/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Permissions', [
      {
      permissionName: 'admin create-vendor',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      permissionName: 'admin disable-vendor-account',
      createdAt: new Date(),
       updatedAt: new Date()
    },
    {
      permissionName: 'vendor sells-product',
      createdAt: new Date(),
       updatedAt: new Date()
    },
    {
      permissionName: 'vendor pays-taxes',
      createdAt: new Date(),
       updatedAt: new Date()
    },
    {
      permissionName: 'buyer views-product',
      createdAt: new Date(),
       updatedAt: new Date()
    },
    {
      permissionName: 'buyer buys-product',
      createdAt: new Date(),
       updatedAt: new Date()
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Permissions', null, {});
  }
};
