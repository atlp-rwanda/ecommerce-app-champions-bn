
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Carts = [
      {
        BuyerId: 3,
        total: 30.98,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        BuyerId: 3,
        total: 26.97,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        BuyerId: 3,
        total: 0.97,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Carts', Carts,{});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Carts', null, {});
  },
};
