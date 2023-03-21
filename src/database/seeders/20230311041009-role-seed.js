/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("roles", null, {})
};