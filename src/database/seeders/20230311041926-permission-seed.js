/** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   up: (queryInterface, Sequelize) => {
//   },
//   down: (queryInterface, Sequelize) => queryInterface.bulkDelete("permissions", null, {})
// };




module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('permissions', [
      {
        permissionName: 'create',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        permissionName: 'read',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        permissionName: 'update',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        permissionName: 'delete',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('permissions', null, {});
  }
};
