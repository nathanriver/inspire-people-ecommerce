const express = require("express");
const { getBanners } = require("../controller/banner");

const router = express.Router();

router.get("/", getBanners);

module.exports = router;
