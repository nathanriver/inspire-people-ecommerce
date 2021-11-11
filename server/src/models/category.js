"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ ProductSize, Product }) {
      this.hasMany(ProductSize, {
        foreignKey: "category_id",
        as: "productSizes",
      });
      this.hasMany(Product, {
        foreignKey: "category_id",
        as: "products",
      });
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "categories",
      timestamps: false,
      underscored: true,
    }
  );
  return Category;
};
