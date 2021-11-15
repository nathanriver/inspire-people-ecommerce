const express = require("express");
const { getUserAddresses } = require("../controllers/addressController");

const router = express.Router();

router.get("/", getUserAddresses);

module.exports = router;
