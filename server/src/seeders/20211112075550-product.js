"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          category_id: 1,
          sku: null,
          slug: "beautiful-world-black",
          name: "Beautiful World",
          color: "Black",
          price: 99000,
          weight: 142,
          summary: null,
          image_url:
            "https://res.cloudinary.com/nathanriver/image/upload/v1636701296/inspire_people/products/tshirt-1_z8lfna.jpg",
          created_at: new Date(),
        },
        {
          category_id: 1,
          sku: null,
          slug: "inspire-people-black",
          name: "Inspire People",
          color: "Black",
          price: 99000,
          weight: 142,
          summary: null,
          image_url:
            "https://res.cloudinary.com/nathanriver/image/upload/v1636701296/inspire_people/products/tshirt-2_gdihhr.jpg",
          created_at: new Date(),
        },
        {
          category_id: 1,
          sku: null,
          slug: "good-culture-black",
          name: "Good Culture",
          color: "Black",
          price: 99000,
          weight: 142,
          summary: null,
          image_url:
            "https://res.cloudinary.com/nathanriver/image/upload/v1636701296/inspire_people/products/tshirt-3_xzbba7.jpg",
          created_at: new Date(),
        },
        {
          category_id: 1,
          sku: null,
          slug: "survivor-black",
          name: "Survivor",
          color: "Black",
          price: 109000,
          weight: 142,
          summary: null,
          image_url:
            "https://res.cloudinary.com/nathanriver/image/upload/v1636701296/inspire_people/products/tshirt-4_alp3r4.jpg",
          created_at: new Date(),
        },
        {
          category_id: 1,
          sku: null,
          slug: "live-black",
          name: "Live",
          color: "Black",
          price: 99000,
          weight: 142,
          summary: null,
          image_url:
            "https://res.cloudinary.com/nathanriver/image/upload/v1636701297/inspire_people/products/tshirt-5_fl1n30.jpg",
          created_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("products", null, {});
  },
};
