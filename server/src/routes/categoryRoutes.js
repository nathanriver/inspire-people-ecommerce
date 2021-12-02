const express = require("express");
const {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");
const { auth, admin } = require("../middleware");

const router = express.Router();

router.get("/", auth, admin, getCategories);
router.post("/", auth, admin, addCategory);
router.delete("/:id", auth, admin, deleteCategory);
router.put("/:id", auth, admin, updateCategory);

module.exports = router;
