const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
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
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      country: DataTypes.STRING,
      gender: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      businessName: DataTypes.STRING,
      location: DataTypes.STRING,
      businessAddress: DataTypes.JSONB,
      businessNumber: DataTypes.INTEGER,
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
