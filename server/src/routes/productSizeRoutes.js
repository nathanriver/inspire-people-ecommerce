const express = require("express");
const {
  getProductSizes,
  addProductSize,
  deleteProductSize,
  updateProductSize,
} = require("../controllers/productSizeController");
const { auth, admin } = require("../middleware");

const router = express.Router();

router.get("/:categoryId/product-sizes", auth, admin, getProductSizes);
router.post("/:categoryId/product-sizes", auth, admin, addProductSize);
router.delete("/:categoryId/product-sizes/:id", auth, admin, deleteProductSize);
router.put("/:categoryId/product-sizes/:id", auth, admin, updateProductSize);

module.exports = router;
