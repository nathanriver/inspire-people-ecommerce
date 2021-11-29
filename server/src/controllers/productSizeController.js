const { ProductSize } = require("../models");

exports.getProductSizes = async (req, res) => {
  try {
    const { categoryId: category_id } = req.params;
    const data = await ProductSize.findAll({
      where: {
        category_id,
      },
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting product sizes.",
    });
  }
};

exports.addProductSize = async (req, res) => {
  try {
    const { categoryId: category_id } = req.params;
    const { name, width, length } = req.body;
    const data = await ProductSize.create({
      category_id,
      name,
      width,
      length,
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in creating product size.",
    });
  }
};

exports.deleteProductSize = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductSize.destroy({
      where: {
        id,
      },
    });
    return res.json({
      message: "Product size deleted.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in creating product size.",
    });
  }
};

exports.updateProductSize = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, width, length } = req.body;
    await ProductSize.update(
      {
        name,
        width,
        length,
      },
      {
        where: {
          id,
        },
      }
    );
    const data = await ProductSize.findOne({
      where: {
        id,
      },
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in updating product size.",
    });
  }
};
