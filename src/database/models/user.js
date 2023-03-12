// const {
//   Model
// } = require('sequelize');

// // eslint-disable-next-line import/no-extraneous-dependencies
// const { v4: uuidv4 } = require('uuid');


// module.exports = (sequelize, DataTypes) => {
//   class user extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   user.init(
//     {
//       firstName: DataTypes.STRING,
//       lastName: DataTypes.STRING,
//       email: DataTypes.STRING,
//       password: DataTypes.STRING,
//       roleId: { type: DataTypes.INTEGER, defaultValue: 1 },
//       googleId: DataTypes.INTEGER,
//       facebookId: DataTypes.INTEGER,
//       isVerified: DataTypes.BOOLEAN,
//       email_token: DataTypes.STRING,
//       profilepic: {
//         type: DataTypes.STRING,
//         defaultValue:
//           "https://res.cloudinary.com/dr8kkof5r/image/upload/v1677341496/articles/fz9vsmgcvjd2iem4pkcy.png"
//       }
//     },
//     {
//       sequelize,
//       modelName: "user"
//     }
//   );
//   return user;
// };




const {
  Model
} = require('sequelize');

// eslint-disable-next-line import/no-extraneous-dependencies
const { v4: uuidv4 } = require('uuid');


module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      // define association here
    }
  }
  user.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    facebookId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: true
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    email_token: {
      type: DataTypes.STRING,
      defaultValue: false
    },
    profilepic: {
              type: DataTypes.STRING,
              defaultValue:
                "https://res.cloudinary.com/dr8kkof5r/image/upload/v1677341496/articles/fz9vsmgcvjd2iem4pkcy.png"
            },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    modelName: 'user',
    tableName: 'users',
    timestamps: true
  });
  return user;
};