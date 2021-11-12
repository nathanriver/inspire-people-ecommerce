"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category, ProductDetail }) {
      this.belongsTo(Category, {
        foreignKey: "category_id",
        as: "category",
      });
      this.hasMany(ProductDetail, {
        foreignKey: "product_id",
        as: "productDetails",
      });
    }
  }
  Product.init(
    {
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sku: {
        type: DataTypes.STRING(16),
      },
      slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      weight: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      summary: {
        type: DataTypes.STRING(300),
      },
      image_url: {
        type: DataTypes.STRING(255),
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      updatedAt: false,
      underscored: true,
    }
  );
  return Product;
};
