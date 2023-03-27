/* eslint-disable arrow-body-style */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('permissions', [
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
        permissionName: 'vendor create-product',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        permissionName: 'vendor delete-product',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        permissionName: 'buyer buyes-product',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        permissionName: 'buyer opens-acount',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('permissions', null, {});
  }
};
