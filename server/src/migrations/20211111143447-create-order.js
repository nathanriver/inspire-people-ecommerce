"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      paymentmethod_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "paymentmethods",
          key: "id",
        },
      },
      address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "addresses",
          key: "id",
        },
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
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("orders");
  },
};
