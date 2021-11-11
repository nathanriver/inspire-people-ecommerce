"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ ProductDetail, Order }) {
      this.belongsTo(ProductDetail, {
        foreignKey: "productdetail_id",
        as: "productDetail",
      });
      this.belongsTo(Order, {
        foreignKey: "order_id",
        as: "productDetail",
      });
    }
  }
  OrderDetail.init(
    {
      productdetail_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OrderDetail",
      tableName: "orderdetails",
      timestamps: false,
      underscored: true,
    }
  );
  return OrderDetail;
};
