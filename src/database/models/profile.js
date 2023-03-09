const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      profile.hasOne(models.Users, {
        foreignKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
    }
  }
  profile.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true
      },
      Country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      businesName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      businesAddress: DataTypes.JSONB,
      businessRegistrationNumber: DataTypes.INTEGER,
      accountNumber: DataTypes.INTEGER,
      taxIdNumber: DataTypes.INTEGER,
      typeOfProducts: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "profile",
      tableName: "profiles",
      timestamps: true
    }
  );
  return profile;
};
