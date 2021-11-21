const express = require("express");
const {
  getUserAddresses,
  addAddress,
} = require("../controllers/addressController");
const { auth } = require("../middleware");

const router = express.Router();

router.get("/", auth, getUserAddresses);
router.post("/", auth, addAddress);

module.exports = router;
