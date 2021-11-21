const express = require("express");
const { getCouriers } = require("../controllers/courierController");
const { auth } = require("../middleware");

const router = express.Router();

router.post("/", auth, getCouriers);

module.exports = router;
