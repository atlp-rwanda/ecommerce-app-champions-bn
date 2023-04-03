const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasOne(models.Buyer);
      User.hasOne(models.Vendor);
      User.belongsTo(models.Role, { foreignKey: "RoleId" });

      User.hasMany(models.Review, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  User.init({
 
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    RoleId: { type: DataTypes.INTEGER },
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
    active:{
      type:DataTypes.BOOLEAN,
      defaultValue:true
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    email_token: {
      type: DataTypes.STRING,
      defaultValue: false
    },
    resetToken:{
      type: DataTypes.STRING,
      allowNull: true
    },
    resetTokenExpiresAt:{
      type: DataTypes.DATE,
      allowNull:true
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
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};