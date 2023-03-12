/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("roles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roleName: {
        type: Sequelize.STRING
      },
      description: {
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
    await queryInterface.bulkInsert('roles',[
      {roleName:'admin',description:'admin of the system',createdAt:new Date(),updatedAt:new Date},
      {roleName:'vendor',description:'vendor/supplier within the shop',createdAt:new Date(),updatedAt:new Date},
      {roleName:'buyer',description:'buyer of the product',createdAt:new Date(),updatedAt:new Date},
      {roleName:'superadmin',description:'controller of the whole app',createdAt:new Date(),updatedAt:new Date},
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("roles");
  }
};
