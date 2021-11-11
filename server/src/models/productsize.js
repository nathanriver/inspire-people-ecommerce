"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductSize extends Model {
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
        foreignKey: "productsize_id",
        as: "productDetails",
      });
    }
  }
  ProductSize.init(
    {
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      width: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      length: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductSize",
      tableName: "productsizes",
      timestamps: false,
      underscored: true,
    }
  );
  return ProductSize;
};
