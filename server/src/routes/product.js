const express = require("express");
const { getProducts, getProductBySlug } = require("../controller/product");

const router = express.Router();

router.get("/", getProducts);
router.get("/:slug", getProductBySlug);

module.exports = router;
