"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "orders",
      [
        {
          user_id: 2,
          paymentmethod_id: 3,
          order_number: "KVXJ9K1515V0JY",
          status: "Pending",
          subtotal: 198000,
          courier: "jne",
          courier_service: "OKE",
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
          user_id: 2,
          status: "Pending",
          subtotal: 99000,
          courier: "jne",
          courier_service: "YES",
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
          user_id: 2,
          paymentmethod_id: 2,
          order_number: "KVXJ9KXJ6L1Q5R",
          status: "Pending",
          subtotal: 99000,
          courier: "jne",
          courier_service: "YES",
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
