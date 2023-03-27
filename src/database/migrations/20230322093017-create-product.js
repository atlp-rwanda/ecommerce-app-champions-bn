

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      productId: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
        
      },
      vendorId: {
        type: Sequelize.INTEGER,
      },
      productName: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      CategoryId: {
        type: Sequelize.INTEGER,
      },
      productImage:{
      type: Sequelize.ARRAY(Sequelize.STRING),
  
      },
      productPrice: {
        type: Sequelize.DOUBLE,
        allowNull:false,
      },
      quantity:{
        type: Sequelize.INTEGER,
        allowNull:false,
        defaultValue:1,
      },
      available:{
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false,
      },
      productDescription:{
        type: Sequelize.STRING,
      },
      productOwner:{
       type: Sequelize.STRING,
       allowNull:false
      },
      expiredDate:{
        type: Sequelize.DATE,
        allowNull:true
      }
      ,
      expired:{
      type: Sequelize.BOOLEAN,
      defaultValue:false,
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
    await queryInterface.dropTable('products');
  }
};