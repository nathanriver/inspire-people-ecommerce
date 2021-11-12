"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("addresses", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
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
      province_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      province_name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      city_name: {
        type: DataTypes.STRING(150),
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
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("addresses");
  },
};
