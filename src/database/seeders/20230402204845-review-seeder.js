const {User, Product } = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    const products = await Product.findAll();
    const users = await User.findAll();
    await queryInterface.bulkInsert('Reviews',[
      {
        title: 'Great product!',
        content: 'I really enjoyed using this product. It exceeded my expectations.',
        rating: 5,
        userId: users[0].id,
        productId: products[0].productId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Disappointing',
        content: 'This product did not live up to its hype. I was very disappointed with it.',
        rating: 2,
        userId: users[1].id,
        productId: products[1].productId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize){
    await queryInterface.bulkDelete("Reviews",null,{});
  }
};
