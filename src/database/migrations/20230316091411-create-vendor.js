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
      },
      businessAddress: {
        type: Sequelize.JSONB,
      },
      accountNumber: {
        type: Sequelize.INTEGER,
      },
      taxIdNumber: {
        type: Sequelize.INTEGER,
      },
      typeOfProducts: {
        type: Sequelize.STRING,
      },
      preferredCurency: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      postalCode: {
        type: Sequelize.INTEGER,
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
