const express = require("express");
const {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../../controllers/admin/productController");
const { auth, admin } = require("../../middleware");

const router = express.Router();

router.get("/:categoryId/products", auth, admin, getProducts);
router.post("/:categoryId/products", auth, admin, addProduct);
router.delete("/:categoryId/products/:id", auth, admin, deleteProduct);
router.put("/:categoryId/products/:id", auth, admin, updateProduct);

module.exports = router;
