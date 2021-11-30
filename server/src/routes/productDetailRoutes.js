const express = require("express");
const { getProductDetail } = require("../controllers/productDetailController");

const router = express.Router();

router.get("/:id", getProductDetail);

module.exports = router;
