const express = require("express");
const {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.get("/", getCategories);
router.post("/", addCategory);
router.delete("/:id", deleteCategory);
router.put("/:id", updateCategory);

module.exports = router;
