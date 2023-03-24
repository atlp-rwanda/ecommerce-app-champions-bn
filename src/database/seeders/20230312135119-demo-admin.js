/** @type {import('sequelize-cli').Migration} */
import bcrypt from "bcrypt";

module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash("test@1234",salt);
<<<<<<< HEAD
     await queryInterface.bulkInsert('users', [{
       firstName: 'admin',
       lastName: "mr",
       email:"admin@gmail.com",
       profilepic:"https://res.cloudinary.com/dr8kkof5r/image/upload/v1677341496/articles/fz9vsmgcvjd2iem4pkcy.png",
       password:adminPassword,
       RoleId:1,
       isVerified:true,
       createdAt: new Date(),
       updatedAt: new Date()
     }], {});
=======
    //  await queryInterface.bulkInsert('users', [{
    //    firstName: 'admin',
    //    lastName: "mr",
    //    email:"admin@gmail.com",
    //    profilepic:"https://res",
    //    password:adminPassword,
    //    RoleId:1,
    //    isVerified:true,
    //    createdAt: new Date(),
    //    updatedAt: new Date()
    //  }], {});
>>>>>>> reabasing to develop
   
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('users', {email:'admin@gmail.com'}, {});
  }
};
