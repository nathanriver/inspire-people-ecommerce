const express = require("express");
const {
  getProductDetail,
  getProductDetails,
} = require("../controllers/productDetailController");

const router = express.Router();

router.get("/:id", getProductDetail);
router.get("/", getProductDetails);

module.exports = router;
