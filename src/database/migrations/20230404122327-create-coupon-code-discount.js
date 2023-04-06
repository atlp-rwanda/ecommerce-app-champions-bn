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
      ProductId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Products',
          key:'id'
        }
      },
      discount: {
        type: Sequelize.INTEGER
      },
      discountStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      originalPrice: {
        type: Sequelize.DOUBLE
      },
      finalPrice: {
        type: Sequelize.DOUBLE
      },
      expirationTime: {
        type: Sequelize.DATE
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
