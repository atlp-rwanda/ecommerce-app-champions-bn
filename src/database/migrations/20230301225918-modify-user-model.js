/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Users", "id", "userId");

    await queryInterface.addColumn("Users", "role", {
      type: Sequelize.STRING,
      defaultValue: "user",
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "role");
    await queryInterface.renameColumn("Users", "userId", "id");
  }
};
