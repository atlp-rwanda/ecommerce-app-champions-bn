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
      product: {
        type: Sequelize.INTEGER,
        references:{
          model:'Products',
          key:'productId'
        }
      },
      discount: {
        type: Sequelize.INTEGER
      },
      expirationDate: {
        type: Sequelize.DATE
      },
      maxUsage:{
        type:Sequelize.INTEGER,
        defaultValue:1
      },
      usageCount:{
        type:Sequelize.INTEGER,
        defaultValue:0
      },
      VendorId:{
        type:Sequelize.INTEGER,
        references:{
          model:'Vendors',
          key:'id'
        }
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
    await queryInterface.dropTable('CouponCodeDiscounts');
  }
};
