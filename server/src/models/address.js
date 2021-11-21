"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Order, City }) {
      this.belongsTo(User, {
        foreignKey: "user_id",
        as: "user",
      });
      this.belongsTo(City, {
        foreignKey: "city_id",
        as: "city",
      });
      this.hasMany(Order, {
        foreignKey: "address_id",
        as: "orders",
      });
    }
  }
  Address.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      label: {
        type: DataTypes.STRING(100),
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
      is_default: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Address",
      tableName: "addresses",
      timestamps: false,
      underscored: true,
    }
  );
  return Address;
};
