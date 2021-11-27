const { Category } = require("../models");

exports.getCategories = async (req, res) => {
  try {
    const data = await Category.findAll();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting categories.",
    });
  }
};
