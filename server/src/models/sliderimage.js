"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SliderImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SliderImage.init(
    {
      image_url: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "SliderImage",
      tableName: "sliderimages",
      timestamps: false,
      underscored: true,
    }
  );
  return SliderImage;
};
