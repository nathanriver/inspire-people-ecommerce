const { ProductSize } = require("../models");

exports.getProductSizes = async (req, res) => {
  try {
    const { category_id } = req.query;
    const data = await ProductSize.findAll({
      where: {
        category_id,
      },
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting product sizes",
    });
  }
};
