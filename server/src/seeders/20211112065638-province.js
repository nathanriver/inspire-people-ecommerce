"use strict";
const provinces = require("../data/provinces");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("provinces", provinces, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("provinces", null, {});
  },
};
