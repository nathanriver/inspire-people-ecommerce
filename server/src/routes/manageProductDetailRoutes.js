const express = require("express");
const {
  getProductDetails,
  addProductDetail,
  deleteProductDetail,
  updateProductDetail,
} = require("../controllers/manageProductDetailController");

const router = express.Router();

router.get("/:productId/product-details", getProductDetails);
router.post("/:productId/product-details", addProductDetail);
router.delete("/:productId/product-details/:id", deleteProductDetail);
router.put("/:productId/product-details/:id", updateProductDetail);

module.exports = router;
