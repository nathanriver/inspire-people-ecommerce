"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "banners",
      [
        {
          image_url:
            "https://res.cloudinary.com/nathanriver/image/upload/v1636701280/inspire_people/covers/cover-1_xgd09t.jpg",
          is_active: true,
        },
        {
          image_url:
            "https://res.cloudinary.com/nathanriver/image/upload/v1636701280/inspire_people/covers/cover-2_thbdtk.jpg",
          is_active: true,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("banners", null, {});
  },
};
