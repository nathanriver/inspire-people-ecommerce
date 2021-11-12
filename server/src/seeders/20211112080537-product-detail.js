"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let productdetails = [];
    for (let i = 1; i <= 6; i++) {
      for (let j = 1; j <= 5; j++) {
        productdetails = [
          ...productdetails,
          {
            productsize_id: i,
            product_id: j,
            stock: Math.floor(Math.random() * 6),
          },
        ];
      }
    }

    await queryInterface.bulkInsert("productdetails", productdetails, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("productdetails", null, {});
  },
};
