const express = require("express");
const { getProvinces } = require("../controllers/roProvinceController");

const router = express.Router();

router.get("/", getProvinces);

module.exports = router;
