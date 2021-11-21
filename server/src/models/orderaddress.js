"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ City, Order }) {
      this.belongsTo(City, {
        foreignKey: "city_id",
        as: "city",
      });
      this.belongsTo(Order, {
        foreignKey: "order_id",
        as: "order",
      });
    }
  }
  OrderAddress.init(
    {
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recipient_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING(16),
        allowNull: false,
      },
      subdistrict: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      postal_code: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      full_address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OrderAddress",
      tableName: "orderaddresses",
      timestamps: false,
      underscored: true,
    }
  );
  return OrderAddress;
};
