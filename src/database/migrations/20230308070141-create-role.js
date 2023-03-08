/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roleName: {
        type: Sequelize.STRING
      },
      description:{
        type:Sequelize.STRING
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
      {
      id:1,
      roleName:'admin',
      description:'ecormmerce administator',
      createdAt:new Date(),
      updatedAt:new Date()
      },
      {
        id:2,
        roleName:'vendor',
        description:'shop creator',
        createdAt:new Date(),
        updatedAt:new Date()
        },
        {
          id:3,
          roleName:'admin',
          description:'buyer on the shop',
          createdAt:new Date(),
          updatedAt:new Date()
          }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('roles');
  }
};