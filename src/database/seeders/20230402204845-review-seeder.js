const { Review, User, Product } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get all products and users
    const products = await Product.findAll();
    const users = await User.findAll();

    // Create an array of review objects
    const reviews = [
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
      },
      // Add more reviews here
    ];

    // Insert the reviews into the database
    return Review.bulkCreate(reviews);
  },

  down: async (queryInterface, Sequelize) => 
    // Delete all reviews
     Review.destroy({ where: {} })
  
};
