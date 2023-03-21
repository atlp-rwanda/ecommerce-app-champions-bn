const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.hasOne(models.Buyer);
      user.hasOne(models.Vendor);
      user.belongsTo(models.Role, { foreignKey: "roleId" });
    }
  }
  user.init(
    {
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
      vendorId: { type: DataTypes.INTEGER },

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
    },
    

  {
    sequelize,
    modelName: 'user',
    tableName: 'users',
    timestamps: true
  });
  return user;
};