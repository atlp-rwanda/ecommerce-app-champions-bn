module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "googleId", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("users", "facebookId", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "googleId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn("users", "facebookId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
