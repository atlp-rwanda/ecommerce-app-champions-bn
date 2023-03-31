/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Products', [
      {
        VendorId: 1,
        productName:"Juice",
        CategoryId:1,
        productImage:['https://res.cloudinary.com/dr8kkof5r/image/upload/v1677341496/articles/fz9vsmgcvjd2iem4pkcy.png'],
        productPrice:1.4,
        quantity:23,
        available:true,
        productDescription:"this is the best product ever",
        productOwner:"kaleb curry",
        createdAt: new Date(),
        updatedAt:new Date()
       },
       {
        VendorId: 1,
        productName:"mango",
        CategoryId:2,
        productImage:['https://res.cloudinary.com/dr8kkof5r/image/upload/v1677341496/articles/fz9vsmgcvjd2iem4pkcy.png'],
        productPrice:1.6,
        quantity:53,
        available:true,
        productDescription:"this is the best product ever",
        productOwner:"kaleb minion",
        createdAt: new Date(),
        updatedAt:new Date()
       },
       {
        VendorId: 1,
        productName:"apple",
        CategoryId:3,
        productImage:['https://res.cloudinary.com/dr8kkof5r/image/upload/v1677341496/articles/fz9vsmgcvjd2iem4pkcy.png'],
        productPrice:4,
        quantity:40,
        available:true,
        productDescription:"this is the best product ever",
        productOwner:"sostene ng",
        createdAt: new Date(),
        updatedAt:new Date()
       },

       {
        VendorId: 1,
        productName:"guava",
        CategoryId:3,
        productImage:['https://res.cloudinary.com/dr8kkof5r/image/upload/v1677341496/articles/fz9vsmgcvjd2iem4pkcy.png'],
        productPrice:4,
        quantity:40,
        available:true,
        productDescription:"this is the best product ever",
        productOwner:"sostene ng",
        createdAt: new Date(),
        updatedAt:new Date()
       },

       {
        VendorId: 1,
        productName:"orange",
        CategoryId:3,
        productImage:['https://res.cloudinary.com/dr8kkof5r/image/upload/v1677341496/articles/fz9vsmgcvjd2iem4pkcy.png'],
        productPrice:4,
        quantity:40,
        available:true,
        productDescription:"this is the best product ever",
        productOwner:"sostene ng",
        createdAt: new Date(),
        updatedAt:new Date()
       },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
