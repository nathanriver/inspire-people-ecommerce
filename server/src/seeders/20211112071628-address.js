"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "addresses",
      [
        {
          uuid: "10a8c090-a2ca-4275-a19e-8e2ecca4a3b0",
          user_id: 2,
          city_id: 151,
          label: "Exercitationem volup",
          recipient_name: "Morty Smith",
          phone_number: "86664206969",
          subdistrict: "Dignissimos",
          postal_code: "11220",
          full_address: "Laudantium, Magnam, Dignissimos 6666",
          is_default: true,
        },
        {
          uuid: "a075ecf2-cb6b-4a23-afdd-d8dfa0e7f456",
          user_id: 2,
          city_id: 22,
          label: "Ationexercitem",
          recipient_name: "Summer Smith",
          phone_number: "866642069670",
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
