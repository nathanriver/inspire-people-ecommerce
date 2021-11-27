const { ProductDetail } = require("../models");

exports.getProductDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ProductDetail.findOne({
      where: {
        id,
      },
      attributes: ["stock"],
      include: [
        {
          association: "product",
          attributes: {
            exclude: ["id", "category_id", "created_at", "summary"],
          },
        },
        {
          association: "productSize",
          attributes: ["name"],
        },
      ],
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting product detail",
    });
  }
};

exports.getProductDetails = async (req, res) => {
  try {
    const { product_id } = req.query;
    const data = await ProductDetail.findAll({
      where: {
        product_id,
      },
      include: {
        association: "productSize",
      },
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting product details",
    });
  }
};
