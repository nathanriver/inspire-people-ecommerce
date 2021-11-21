"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ City }) {
      this.hasMany(City, {
        foreignKey: "province_id",
        as: "cities",
      });
    }
  }
  Province.init(
    {
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Province",
      tableName: "provinces",
      timestamps: false,
      underscored: true,
    }
  );
  return Province;
};
