"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "orderdetails",
      [
        {
          productdetail_id: 7,
          order_id: 1,
          quantity: 1,
        },
        {
          productdetail_id: 8,
          order_id: 1,
          quantity: 1,
        },
        {
          productdetail_id: 7,
          order_id: 2,
          quantity: 1,
        },
        {
          productdetail_id: 8,
          order_id: 3,
          quantity: 1,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("orderdetails", null, {});
  },
};
