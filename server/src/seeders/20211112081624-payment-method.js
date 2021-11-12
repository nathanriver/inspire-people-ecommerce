"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "paymentmethods",
      [
        {
          name: "Credit Card",
        },
        {
          name: "BCA Virtual Account",
        },
        {
          name: "GoPay",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("paymentmethods", null, {});
  },
};
