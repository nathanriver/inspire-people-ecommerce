"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "orders",
      [
        {
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
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("orders", null, {});
  },
};
