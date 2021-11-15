const express = require("express");
const { getUserOrders, getOrder } = require("../controllers/orderController");

const router = express.Router();

router.get("/", getUserOrders);
router.get("/:orderNumber", getOrder);

module.exports = router;
