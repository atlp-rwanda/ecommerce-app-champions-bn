/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      BuyerId: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" }
      },
      orderTotal: {
        type: Sequelize.STRING,
        defaultValue: "order"
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "order"
      },
      paymentStatus: {
        type: Sequelize.STRING,
        defaultValue: "pending"
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
    await queryInterface.dropTable("Orders");
  }
};
