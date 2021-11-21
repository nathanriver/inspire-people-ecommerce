const express = require("express");
const { getCities, getCity } = require("../controllers/roCityController");

const router = express.Router();

router.get("/", getCities);
router.get("/:id", getCity);

module.exports = router;
