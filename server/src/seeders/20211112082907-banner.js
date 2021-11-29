"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "banners",
      [
        {
          image_url:
            "https://res.cloudinary.com/nathanriver/image/upload/v1638200537/inspire_people/banners/u9zb0nwlkg98kzjdbn81.jpg",
          public_id: "inspire_people/banners/u9zb0nwlkg98kzjdbn81",
          is_active: true,
        },
        {
          image_url:
            "https://res.cloudinary.com/nathanriver/image/upload/v1638200553/inspire_people/banners/lbfo4amh2v8gwlhdiutm.jpg",
          public_id: "inspire_people/banners/lbfo4amh2v8gwlhdiutm",
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
