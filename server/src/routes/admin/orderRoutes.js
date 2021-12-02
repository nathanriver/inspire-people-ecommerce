const express = require("express");
const {
  getOrders,
  getOrder,
  updateOrder,
} = require("../../controllers/admin/orderController");
const { auth } = require("../../middleware");

const router = express.Router();

router.get("/", auth, getOrders);
router.get("/:id", auth, getOrder);
router.put("/:id", auth, updateOrder);

module.exports = router;
