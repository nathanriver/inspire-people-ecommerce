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

exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Category.findOne({
      where: {
        id,
      },
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting category.",
    });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { name, is_one_size } = req.body;
    const data = await Category.create({
      name,
      is_one_size,
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in creating category.",
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.destroy({
      where: {
        id,
      },
    });
    return res.json({
      message: "Category deleted.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in deleting category.",
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, is_one_size } = req.body;
    await Category.update(
      {
        name,
        is_one_size,
      },
      {
        where: {
          id,
        },
      }
    );
    const data = await Category.findOne({
      where: {
        id,
      },
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in updating category.",
    });
  }
};
