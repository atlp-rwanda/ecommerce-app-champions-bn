/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Sales", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      OrderId: {
        type: Sequelize.INTEGER,
        references: { model: "Orders", key: "id" }
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references: { model: "Products", key: "productId" }
      },
      VendorId: {
        type: Sequelize.INTEGER,
        references:{ model:'Vendors', key:'id', }
      },
      Status: Sequelize.STRING,
      Quantity: Sequelize.STRING,
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
    await queryInterface.dropTable("Sales");
  }
};
