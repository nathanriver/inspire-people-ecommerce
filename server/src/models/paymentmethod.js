"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order }) {
      this.hasMany(Order, {
        foreignKey: "paymentmethod_id",
        as: "orders",
      });
    }
  }
  PaymentMethod.init(
    {
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PaymentMethod",
      tableName: "paymentmethods",
      timestamps: false,
      underscored: true,
    }
  );
  return PaymentMethod;
};
