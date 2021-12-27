require("dotenv").config();
module.exports = {
  development: {
    username: "postgres",
    password: "123456",
    database: "inspire_people_ecommerce",
    host: "db",
    // host: "localhost",
    dialect: "postgres",
    define: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    minifyAliases: true,
  },
  test: {
    username: "postgres",
    password: "123456",
    database: "inspire_people_ecommerce",
    host: "db",
    // host: "localhost",
    dialect: "postgres",
    define: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    minifyAliases: true,
  },
  production: {
    use_env_variable: "DATABASE_URL",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    ssl: process.env.DB_SSL,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    define: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    minifyAliases: true,
  },
};
