/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Vendors', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey: true
      },
      UserId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Users',
          key:'id'
        }
      },
      birthDate:{
        type:Sequelize.DATE,
       },
       gender:{
        type:Sequelize.JSONB,
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
    await queryInterface.dropTable('Vendors');
  }
};