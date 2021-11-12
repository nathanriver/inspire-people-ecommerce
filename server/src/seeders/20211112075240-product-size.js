"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "productsizes",
      [
        {
          category_id: 1,
          name: "XS",
          width: 45,
          length: 65,
        },
        {
          category_id: 1,
          name: "S",
          width: 47.5,
          length: 67.5,
        },
        {
          category_id: 1,
          name: "M",
          width: 50,
          length: 70,
        },
        {
          category_id: 1,
          name: "L",
          width: 52.5,
          length: 72.5,
        },
        {
          category_id: 1,
          name: "XL",
          width: 55,
          length: 75,
        },
        {
          category_id: 1,
          name: "XXL",
          width: 57.5,
          length: 77.5,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("productsizes", null, {});
  },
};
