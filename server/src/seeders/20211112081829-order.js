"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "orders",
      [
        {
          order_number: "KVXJ9K1515V0JY",
          paymentmethod_id: 3,
          address_id: 1,
          status: "Pending",
          subtotal: 198000,
          courier: "JNE",
          shipping_fee: 11000,
          total: 209000,
          weight: 284,
          origin: 23,
          tracking_number: null,
          transaction_id: null,
          transaction_date: null,
          created_at: new Date(),
        },
        {
          order_number: "KVXJ9KQI2V2HXC",
          paymentmethod_id: 2,
          address_id: 2,
          status: "Pending",
          subtotal: 99000,
          courier: "JNE",
          shipping_fee: 11000,
          total: 110000,
          weight: 142,
          origin: 23,
          tracking_number: null,
          transaction_id: null,
          transaction_date: null,
          created_at: new Date(),
        },
        {
          order_number: "KVXJ9KXJ6L1Q5R",
          paymentmethod_id: 2,
          address_id: 2,
          status: "Pending",
          subtotal: 99000,
          courier: "JNE",
          shipping_fee: 11000,
          total: 110000,
          weight: 142,
          origin: 23,
          tracking_number: null,
          transaction_id: null,
          transaction_date: null,
          created_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("orders", null, {});
  },
};
