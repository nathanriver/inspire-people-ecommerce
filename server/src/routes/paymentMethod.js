const express = require("express");
const { getPaymentMethods } = require("../controller/paymentMethod");

const router = express.Router();

router.get("/", getPaymentMethods);

module.exports = router;
