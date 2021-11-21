"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "orderaddresses",
      [
        {
          order_id: 1,
          city_id: 151,
          recipient_name: "Morty Smith",
          phone_number: "86664206969",
          subdistrict: "Dignissimos",
          postal_code: "11220",
          full_address: "Laudantium, Magnam, Dignissimos 6666",
        },
        {
          order_id: 2,
          city_id: 22,
          recipient_name: "Summer Smith",
          phone_number: "866642069670",
          subdistrict: "Venenatis",
          postal_code: "40311",
          full_address: "Lacus, Enim, Venenatis 7777",
        },
        {
          order_id: 3,
          city_id: 22,
          recipient_name: "Summer Smith",
          phone_number: "866642069670",
          subdistrict: "Venenatis",
          postal_code: "40311",
          full_address: "Lacus, Enim, Venenatis 7777",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("orderaddresses", null, {});
  },
};
