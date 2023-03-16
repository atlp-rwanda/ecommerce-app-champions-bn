/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("buyers", {
      id: {
        type: Sequelize.INTEGER,
        defaultValue:Sequelize.INTEGER,
        type: Sequelize.UUID,
<<<<<<< HEAD
<<<<<<< HEAD
        defaultValue:Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
     userId:{
        type:Sequelize.INTEGER,
        references:{model:"users",key:"id"}
     },
     shipingAddress:{
        type:Sequelize.JSONB,
        allowNull:false
     },
     paymentMethod:{
        type:Sequelize.STRING,
        allowNull:false
     },
     preferredCurency:{
    type:Sequelize.STRING,
     allowNull:false
    },
     createdAt: {
=======
=======
>>>>>>> 95f73a4 (ft-register-vendor:)
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        type: Sequelize.UUID,
        references: { model: "users", key: "id" }
      },
      shipingAddress: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: false
      },
      preferredCurency: {
        type: Sequelize.STRING,
        allowNull: false
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
