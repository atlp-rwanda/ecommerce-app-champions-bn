const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    try{
      await queryInterface.createTable("users", {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
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
        roleId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        googleId: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        facebookId: {
          type: Sequelize.INTEGER,
          allowNull: true
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

    }catch(err){
     console.log(err);
      
    };
   
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  }
};
