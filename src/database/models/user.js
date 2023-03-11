const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: { type: DataTypes.INTEGER, defaultValue: 1 },
      googleId: DataTypes.INTEGER,
      facebookId: DataTypes.INTEGER,
      isVerified: DataTypes.BOOLEAN,
      email_token: DataTypes.STRING,
      profilepic: {
        type: DataTypes.STRING,
        defaultValue:
          "https://res.cloudinary.com/dr8kkof5r/image/upload/v1677341496/articles/fz9vsmgcvjd2iem4pkcy.png"
      }
    },
    {
      sequelize,
      modelName: "user"
    }
  );
  return user;
};
