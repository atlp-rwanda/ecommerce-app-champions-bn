/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("vendors", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      businessName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      businessAddress: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      accountNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      taxIdNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      typeOfProducts: {
        type: Sequelize.STRING,
        allowNull: false
      },
      preferredCurency: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      postalCode: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    await queryInterface.dropTable("Vendors");
  }
};