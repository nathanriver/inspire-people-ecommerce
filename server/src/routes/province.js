const express = require("express");
const { getProvinces } = require("../controller/province");

const router = express.Router();

router.get("/", getProvinces);

module.exports = router;
