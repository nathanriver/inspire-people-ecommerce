const express = require("express");
const { changePassword } = require("../controllers/changePasswordController");
const { auth } = require("../middleware");

const router = express.Router();

router.put("/", auth, changePassword);

module.exports = router;
