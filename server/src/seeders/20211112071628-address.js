"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "addresses",
      [
        {
          user_id: 2,
          label: "Exercitationem volup",
          recipient_name: "Morty Smith",
          phone_number: "86664206969",
          province_id: 6,
          city_id: 151,
          subdistrict: "Dignissimos",
          postal_code: "11220",
          full_address: "Laudantium, Magnam, Dignissimos 6666",
          is_default: true,
        },
        {
          user_id: 2,
          label: "Ationexercitem",
          recipient_name: "Summer Smith",
          phone_number: "866642069670",
          province_id: 9,
          city_id: 22,
          subdistrict: "Venenatis",
          postal_code: "40311",
          full_address: "Lacus, Enim, Venenatis 7777",
          is_default: false,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("addresses", null, {});
  },
};
