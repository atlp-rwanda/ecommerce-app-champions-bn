/** @type {import('sequelize-cli').Migration} */
import bcrypt from "bcrypt";

module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash("test@1234",salt);
    const vendorPassword = await bcrypt.hash("vendor@1234",salt);
    const buyerPassword = await bcrypt.hash("buyer@1234",salt);
     await queryInterface.bulkInsert('Users', [
      {
      firstName: 'admin',
      lastName: "mr",
      email:"admin@gmail.com",
      profilepic:"https://res.cloudinary.com/dr8kkof5r/image/upload/v1677341496/articles/fz9vsmgcvjd2iem4pkcy.png",
      password:adminPassword,
      RoleId:1,
      isVerified:true,
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      firstName: 'vendor',
      lastName: "mr",
      email:"vendor@yopmail.com",
      profilepic:"https://res.cloudinary.com/dr8kkof5r/image/upload/v1677341496/articles/fz9vsmgcvjd2iem4pkcy.png",
      password: vendorPassword,
      RoleId:2,
      isVerified:true,
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      firstName: 'vendor250',
      lastName: "miss",
      email:"missvendor@yopmail.com",
      profilepic:"https://res.cloudinary.com/dr8kkof5r/image/upload/v1677341496/articles/fz9vsmgcvjd2iem4pkcy.png",
      password: vendorPassword,
      RoleId:2,
      isVerified:true,
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      firstName: 'buyer',
      lastName: "mr",
      email:"buyer@yopmail.com",
      profilepic:"https://res.cloudinary.com/dr8kkof5r/image/upload/v1677341496/articles/fz9vsmgcvjd2iem4pkcy.png",
      password: buyerPassword,
      RoleId:3,
      isVerified:true,
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      firstName: 'buyer',
      lastName: "mr",
      email:"buyer1@yopmail.com",
      profilepic:"https://res.cloudinary.com/dr8kkof5r/image/upload/v1677341496/articles/fz9vsmgcvjd2iem4pkcy.png",
      password: buyerPassword,
      RoleId:3,
      isVerified:true,
      createdAt: new Date(),
      updatedAt: new Date()
     }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
