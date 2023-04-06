
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const carts = [
      {
        buyerId: 3,
        total: 30.98,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        buyerId: 3,
        total: 26.97,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        buyerId: 3,
        total: 0.97,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Carts', carts,{});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Carts', null, {});
  },
};
