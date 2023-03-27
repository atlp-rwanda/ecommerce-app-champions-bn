/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert("users", [
      {
        firstName: "John",
        lastName: "Doe",
        email: "niyomutonilucie@gmail.com",
        RoleId:2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("users", null, {})
};
