const { Product } = require("../models");

exports.getProducts = async (req, res) => {
  try {
    const data = await Product.findAll({
      attributes: {
        exclude: [
          "id",
          "category_id",
          "sku",
          "weight",
          "summary",
          "created_at",
        ],
      },
    });
    res.json({ data });
  } catch (error) {
    res.status(500).json({
      message: "Error in getting products",
    });
  }
};

exports.getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const data = await Product.findOne({
      where: {
        slug,
      },
      attributes: {
        exclude: ["id", "category_id", "weight", "created_at"],
      },
      include: {
        association: "productDetails",
        attributes: ["id", "stock"],
        include: {
          association: "productSize",
          attributes: ["name"],
        },
      },
    });

    res.json({ data });
  } catch (error) {
    res.status(500).json({
      message: "Error in getting product",
    });
  }
};
