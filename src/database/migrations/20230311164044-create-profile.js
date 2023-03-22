/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("profiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      country: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      birthDate: {
        type: Sequelize.STRING
      },
      businessName: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      businessAddress: {
        type: Sequelize.STRING
      },
      businessNumber: {
        type: Sequelize.INTEGER
      },
      accountNumber: {
        type: Sequelize.INTEGER
      },
      taxIdNumber: {
        type: Sequelize.INTEGER
      },
      typeOfProducts: {
        type: Sequelize.STRING
      },
      
      profilepic: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      resetToken:{
        type: Sequelize.STRING,
        allowNull: true
      },
      resetTokenExpiresAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("profiles");
  }
};
