/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("roles", [
      {
        roleName: "Admin",
        description: "ecommerce administrator",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: "vendor",
        description: "product supplier",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("roles", null, {});
  }
};