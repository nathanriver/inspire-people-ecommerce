"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          uuid: "2c9f1cd0-6cce-4cbd-ac2f-d113f2c1d1b7",
          role: "Admin",
          name: "Rick Sanchez",
          email: "rick@email.com",
          password:
            "$2a$10$qhCrvyb9bQeXFk3AIduNsO5iLsZHQYnqofhET4tZmUgygG8LR/EQe",
          created_at: new Date(),
        },
        {
          uuid: "1ecab83a-9549-4cd9-b2b2-60f1857d9c8d",
          role: "User",
          name: "Morty Smith",
          email: "morty@email.com",
          password:
            "$2a$10$qhCrvyb9bQeXFk3AIduNsO5iLsZHQYnqofhET4tZmUgygG8LR/EQe",
          created_at: new Date(),
        },
        {
          uuid: "603f36e3-7576-42d7-87af-4fffccdfabcb",
          role: "User",
          name: "Summer Smith",
          email: "summer@email.com",
          password:
            "$2a$10$qhCrvyb9bQeXFk3AIduNsO5iLsZHQYnqofhET4tZmUgygG8LR/EQe",
          created_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
