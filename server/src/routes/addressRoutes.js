const express = require("express");
const {
  getUserAddresses,
  addAddress,
  deleteAddress,
} = require("../controllers/addressController");
const { auth } = require("../middleware");

const router = express.Router();

router.get("/", auth, getUserAddresses);
router.post("/", auth, addAddress);
router.delete("/:id", auth, deleteAddress);

module.exports = router;
