"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Province, Address, OrderAddress }) {
      this.belongsTo(Province, {
        foreignKey: "province_id",
        as: "province",
      });
      this.hasMany(Address, {
        foreignKey: "city_id",
        as: "addresses",
      });
      this.hasMany(OrderAddress, {
        foreignKey: "city_id",
        as: "orderAddresses",
      });
    }
  }
  City.init(
    {
      province_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      postal_code: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "City",
      tableName: "cities",
      timestamps: false,
      underscored: true,
    }
  );
  return City;
};
