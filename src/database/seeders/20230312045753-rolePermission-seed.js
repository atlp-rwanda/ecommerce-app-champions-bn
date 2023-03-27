/* eslint-disable arrow-body-style */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RolePermissions', [
      {
        RoleId: 1,
        PermissionId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        RoleId: 1,
        PermissionId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RolePermissions', null, {});
  }
};

