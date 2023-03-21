/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("permissions", [
      {
        permissionName: 'view_products',
        description: 'Can view products',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'edit_products',
      description: 'Can edit products',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        permissionName: 'delete_products',
      description: 'Can delete products',
      createdAt: new Date(),
      updatedAt: new Date(),
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("permissions", null, {});
  }
};
