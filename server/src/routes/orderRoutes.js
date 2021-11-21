const express = require("express");
const { getUserOrders, getOrder } = require("../controllers/orderController");
const { auth } = require("../middleware");

const router = express.Router();

router.get("/", auth, getUserOrders);
router.get("/:orderNumber", auth, getOrder);

module.exports = router;
