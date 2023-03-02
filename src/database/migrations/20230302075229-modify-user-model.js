/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Users", "first_name", "firstName");
    await queryInterface.renameColumn("Users", "last_name", "lastName");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Users", "firstName", "first_name");
    await queryInterface.renameColumn("Users", "lastName", "last_name");
  }
};
