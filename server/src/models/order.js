"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ PaymentMethod, Address, OrderDetail }) {
      this.belongsTo(PaymentMethod, {
        foreignKey: "paymentmethod_id",
        as: "paymentMethod",
      });
      this.belongsTo(Address, {
        foreignKey: "address_id",
        as: "address",
      });
      this.hasMany(OrderDetail, {
        foreignKey: "order_id",
        as: "orderdetails",
      });
    }
  }
  Order.init(
    {
      paymentmethod_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },

      subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      courier: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      shipping_fee: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      weight: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      origin: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tracking_number: {
        type: DataTypes.STRING(15),
      },
      transaction_id: {
        type: DataTypes.STRING(36),
      },
      transaction_date: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "categories",
      updatedAt: false,
      underscored: true,
    }
  );
  return Order;
};
