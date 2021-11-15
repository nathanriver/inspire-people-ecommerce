const express = require("express");
const { getProvinces } = require("../controllers/provinceController");

const router = express.Router();

router.get("/", getProvinces);

module.exports = router;
