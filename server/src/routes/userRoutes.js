const express = require("express");
const {
  updateProfile,
  changePassword,
} = require("../controllers/userControler");
const { auth } = require("../middleware");

const router = express.Router();

router.put("/profiles", auth, updateProfile);
router.put("/change-password", auth, changePassword);

module.exports = router;
