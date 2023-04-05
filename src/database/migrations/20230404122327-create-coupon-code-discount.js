/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CouponCodeDiscounts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      couponCode: {
        type: Sequelize.STRING
      },
      productId: {
        type: Sequelize.INTEGER
      },
      discount: {
        type: Sequelize.STRING
      },
      discountStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      originalPrice: {
        type: Sequelize.INTEGER
      },
      finalPrice: {
        type: Sequelize.INTEGER
      },
      expirationTime: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable("CouponCodeDiscounts");
  }
};
