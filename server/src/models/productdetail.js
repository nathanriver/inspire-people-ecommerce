"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ ProductSize, Product, OrderDetail }) {
      this.belongsTo(ProductSize, {
        foreignKey: "productsize_id",
        as: "productSize",
      });
      this.belongsTo(Product, {
        foreignKey: "product_id",
        as: "product",
      });
      this.hasMany(OrderDetail, {
        foreignKey: "productdetail_id",
        as: "orderDetails",
      });
    }
  }
  ProductDetail.init(
    {
      productsize_id: {
        type: DataTypes.INTEGER,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductDetail",
      tableName: "productdetails",
      timestamps: false,
      underscored: true,
    }
  );
  return ProductDetail;
};
