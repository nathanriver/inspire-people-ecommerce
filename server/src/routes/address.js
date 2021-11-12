const express = require("express");
const { getUserAddresses } = require("../controller/address");

const router = express.Router();

router.get("/", getUserAddresses);

module.exports = router;
