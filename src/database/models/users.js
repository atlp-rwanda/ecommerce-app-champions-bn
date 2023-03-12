const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      gender: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      preferredLanguage: DataTypes.STRING,
      preferredCurrency: DataTypes.STRING,
      googleId: DataTypes.STRING,
      facebookId: DataTypes.STRING,
      roleId: { type: DataTypes.INTEGER, defaultValue: 1 },
      isVerified: DataTypes.BOOLEAN,
      email_token: DataTypes.STRING,
      profilePic: {
        type: DataTypes.STRING,
        defaultValue:
          "https://res.cloudinary.com/dr8kkof5r/image/upload/v1677341496/articles/fz9vsmgcvjd2iem4pkcy.png"
      }
    },
    {
      sequelize,
      modelName: "Users",
      tableName: "Users",
      timestamps: true
    }
  );
  return Users;
};
