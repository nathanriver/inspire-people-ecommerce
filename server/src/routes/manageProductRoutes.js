const express = require("express");
const {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/manageProductController");

const router = express.Router();

router.get("/:categoryId/products", getProducts);
router.post("/:categoryId/products", addProduct);
router.delete("/:categoryId/products/:id", deleteProduct);
router.put("/:categoryId/products/:id", updateProduct);

module.exports = router;
