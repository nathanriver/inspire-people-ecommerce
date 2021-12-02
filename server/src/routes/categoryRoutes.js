const express = require("express");
const {
  getCategories,
  getCategory,
  addCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");
const { auth, admin } = require("../middleware");

const router = express.Router();

router.get("/", auth, admin, getCategories);
router.post("/", auth, admin, addCategory);
router.get("/:id", auth, admin, getCategory);
router.delete("/:id", auth, admin, deleteCategory);
router.put("/:id", auth, admin, updateCategory);

module.exports = router;
