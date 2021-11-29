const express = require("express");
const {
  getProductSizes,
  addProductSize,
  deleteProductSize,
  updateProductSize,
} = require("../controllers/productSizeController");

const router = express.Router();

router.get("/:categoryId/product-sizes", getProductSizes);
router.post("/:categoryId/product-sizes", addProductSize);
router.delete("/:categoryId/product-sizes/:id", deleteProductSize);
router.put("/:categoryId/product-sizes/:id", updateProductSize);

module.exports = router;
