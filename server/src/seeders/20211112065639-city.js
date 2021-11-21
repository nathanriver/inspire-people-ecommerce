"use strict";
const cities = require("../data/cities");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("cities", cities, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("cities", null, {});
  },
};
