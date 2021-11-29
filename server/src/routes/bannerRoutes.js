const express = require("express");
const {
  getBanners,
  addBanner,
  deleteBanner,
  getActiveBanners,
  toggleActiveBanner,
} = require("../controllers/bannerController");

const router = express.Router();

router.get("/", getBanners);
router.post("/", addBanner);
router.delete("/:id", deleteBanner);
router.get("/active", getActiveBanners);
router.patch("/:id/active", toggleActiveBanner);

module.exports = router;
