const express = require("express");
const { validate, register, login } = require("../controllers/authController");
const { auth } = require("../middleware");

const router = express.Router();

router.post("/validate", auth, validate);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
