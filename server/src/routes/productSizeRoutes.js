const express = require("express");
const { getProductSizes } = require("../controllers/productSizeController");

const router = express.Router();

router.get("/", getProductSizes);

module.exports = router;
