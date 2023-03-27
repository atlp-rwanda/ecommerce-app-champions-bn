/* eslint-disable arrow-body-style */
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  // eslint-disable-next-line arrow-body-style
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [
      {
        roleName: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  // eslint-disable-next-line arrow-body-style
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};