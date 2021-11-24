const express = require("express");
const { updateProfile } = require("../controllers/profileController");
const { auth } = require("../middleware");

const router = express.Router();

router.put("/", auth, updateProfile);

module.exports = router;
