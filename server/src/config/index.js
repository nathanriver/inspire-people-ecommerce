const axios = require("axios");

exports.RajaOngkir = axios.create({
  baseURL: "https://api.rajaongkir.com/starter/",
  headers: { key: process.env.RAJAONGKIR_KEY },
});
