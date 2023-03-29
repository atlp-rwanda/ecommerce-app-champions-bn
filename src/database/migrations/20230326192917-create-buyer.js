/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Buyers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Users',
          key:'id'
        }
      },
      birthDate:{
        type:Sequelize.JSONB,
       },
       gender:{
        type:Sequelize.JSONB,
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
    await queryInterface.dropTable('Buyers');
  }
};