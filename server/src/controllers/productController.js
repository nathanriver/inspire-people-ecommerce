const { Op } = require("sequelize");
const JWT = require("jsonwebtoken");
const { Product, User } = require("../models");

exports.getProducts = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    const { category_id } = req.query;
    const productWhere = {};
    let productAttributes = {
      exclude: ["id", "category_id", "sku", "weight", "summary", "created_at"],
    };
    if (category_id) {
      productWhere.category_id = category_id;
    }
    if (token) {
      const decodedToken = JWT.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({
        where: {
          uuid: decodedToken.id,
        },
      });
      if (user.role === "Admin") {
        productAttributes = {};
      }
    }
    const data = await Product.findAll({
      attributes: productAttributes,
      where: productWhere,
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting products.",
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
        where: {
          stock: {
            [Op.gt]: 0,
          },
        },
        attributes: ["id", "stock"],
        include: {
          association: "productSize",
          attributes: ["name"],
        },
      },
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting product.",
    });
  }
};
