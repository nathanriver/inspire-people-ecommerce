const express = require("express");
const {
  getProductDetails,
  addProductDetail,
  deleteProductDetail,
  updateProductDetail,
} = require("../../controllers/admin/productDetailController");
const { auth, admin } = require("../../middleware");

const router = express.Router();

router.get("/:productId/product-details", auth, admin, getProductDetails);
router.post("/:productId/product-details", auth, admin, addProductDetail);
router.delete(
  "/:productId/product-details/:id",
  auth,
  admin,
  deleteProductDetail
);
router.put("/:productId/product-details/:id", auth, admin, updateProductDetail);

module.exports = router;
