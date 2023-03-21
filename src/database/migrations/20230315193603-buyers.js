/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("buyers", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
     shipingAddress:{
        type:Sequelize.JSONB,
     },
     paymentMethod:{
        type:Sequelize.STRING,
     },
     preferredCurency:{
    type:Sequelize.STRING,
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
    await queryInterface.dropTable("buyers");
  }
};
