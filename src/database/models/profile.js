const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      profile.belongsTo(models.user, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
    }
  }
  profile.init(
    {
      country: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      businessName: DataTypes.STRING,
      location: DataTypes.STRING,
      businessAddress: DataTypes.JSONB,
      businessNumber: DataTypes.STRING,
      accountNumber: DataTypes.INTEGER,
      taxIdNumber: DataTypes.INTEGER,
      typeOfProducts: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "profile",
      tableName: "profiles"
    }
  );
  return profile;
};
