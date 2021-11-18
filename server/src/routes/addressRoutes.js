const express = require("express");
const { getUserAddresses } = require("../controllers/addressController");
const { auth } = require("../middleware");

const router = express.Router();

router.get("/", auth, getUserAddresses);

module.exports = router;
