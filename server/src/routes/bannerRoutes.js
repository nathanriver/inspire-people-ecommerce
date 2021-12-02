const express = require("express");
const {
  getBanners,
  addBanner,
  deleteBanner,
  getActiveBanners,
  toggleActiveBanner,
} = require("../controllers/bannerController");
const { auth, admin } = require("../middleware");

const router = express.Router();

router.get("/", auth, admin, getBanners);
router.post("/", auth, admin, addBanner);
router.delete("/:id", auth, admin, deleteBanner);
router.get("/active", getActiveBanners);
router.patch("/:id/active", auth, admin, toggleActiveBanner);

module.exports = router;
