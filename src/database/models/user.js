const { Model } = require('sequelize');

// eslint-disable-next-line import/no-extraneous-dependencies
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.belongsTo(models.Role,{ foreignKey:'roleId' });
    }
  }
  user.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId:{type:DataTypes.INTEGER},
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
