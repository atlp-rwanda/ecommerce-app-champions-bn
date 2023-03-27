/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable('ReportedActivities', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        category: {
          type: Sequelize.STRING
        },
        activity: {
          type: Sequelize.STRING
        },
        VendorId: {
          type: Sequelize.INTEGER
        },
        productId: {
          type: Sequelize.INTEGER
        },
        buyerId: {
          type: Sequelize.INTEGER
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
      await queryInterface.dropTable('ReportedActivities');
    }
  };