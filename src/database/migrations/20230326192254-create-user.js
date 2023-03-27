/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement:true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
       RoleId: {
        type: Sequelize.INTEGER,
        references:{
          model:"Roles",
          key:'id'
        }
      },
      googleId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      facebookId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      active:{
        type:Sequelize.BOOLEAN,
        defaultValue:true
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      email_token: {
        type: Sequelize.STRING,
        allowNull: true
      },
      profilepic: {
        type: Sequelize.STRING,
      },
      resetToken:{
        type: Sequelize.STRING,
        allowNull: true
      },
      resetTokenExpiresAt:{
        type: Sequelize.DATE,
        allowNull:true
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
    await queryInterface.dropTable('Users');
  }
};