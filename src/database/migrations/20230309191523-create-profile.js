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
        type: Sequelize.UUID,
        allowNull: false,
        unique: true
      },
      Country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      businesName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      businesAddress: {
        type: Sequelize.JSON,
        allowNull: false
      },
      businessRegistrationNumber: {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("profiles");
  }
};
