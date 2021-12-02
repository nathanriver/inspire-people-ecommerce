const express = require("express");
const {
  getUserOrders,
  addOrder,
  getOrder,
} = require("../controllers/orderController");
const { auth } = require("../middleware");

const router = express.Router();

router.get("/", auth, getUserOrders);
router.post("/", auth, addOrder);
router.get("/:orderNumber", auth, getOrder);

module.exports = router;
