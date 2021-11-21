"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, PaymentMethod, OrderAddress, OrderDetail }) {
      this.belongsTo(User, {
        foreignKey: "user_id",
        as: "user",
      });
      this.belongsTo(PaymentMethod, {
        foreignKey: "paymentmethod_id",
        as: "paymentMethod",
      });
      this.hasOne(OrderAddress, {
        foreignKey: "order_id",
        as: "orderAddress",
      });
      this.hasMany(OrderDetail, {
        foreignKey: "order_id",
        as: "orderDetails",
      });
    }
  }
  Order.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      paymentmethod_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order_number: {
        type: DataTypes.STRING(14),
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
      tableName: "orders",
      updatedAt: false,
      underscored: true,
    }
  );
  return Order;
};
