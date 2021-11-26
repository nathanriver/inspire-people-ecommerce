const axios = require("axios");
const Xendit = require("xendit-node");

exports.RajaOngkir = axios.create({
  baseURL: "https://api.rajaongkir.com/starter/",
  headers: { key: process.env.RAJAONGKIR_KEY },
});

exports.x = new Xendit({
  secretKey: process.env.XENDIT_SECRET_KEY,
});
