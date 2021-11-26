"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "orders",
      [
        {
          user_id: 2,
          paymentmethod_id: 1,
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
          transaction_id: "KWEVXN470VXSC7QUT",
          transaction_date: null,
          created_at: "2021-11-25 18:41:20.756+07",
        },
        {
          order_number: "KVXJ9KQI2V2HXC",
          paymentmethod_id: 1,
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
          transaction_id: "KWEVXN470VXSC7QUT",
          transaction_date: null,
          created_at: "2021-11-25 18:41:21.756+07",
        },
        {
          user_id: 2,
          paymentmethod_id: 1,
          order_number: "KWEVXOLFIJT7LO",
          status: "Pending",
          subtotal: 99000,
          courier: "jne",
          courier_service: "OKE",
          shipping_fee: 10000,
          total: 119000,
          weight: 142,
          origin: 23,
          tracking_number: null,
          transaction_id: "KWEVXN470VXSC7QUT",
          transaction_date: null,
          created_at: "2021-11-25 18:41:22.756+07",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("orders", null, {});
  },
};
