const express = require("express");
const {
  getOrders,
  getOrder,
} = require("../../controllers/admin/orderController");
const { auth } = require("../../middleware");

const router = express.Router();

router.get("/", auth, getOrders);
router.get("/:id", auth, getOrder);

module.exports = router;
