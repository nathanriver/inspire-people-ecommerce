const { ProductDetail } = require("../models");

exports.getProductDetails = async (req, res) => {
  try {
    const { productId: product_id } = req.params;
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
      message: "Error in getting product details.",
    });
  }
};

exports.addProductDetail = async (req, res) => {
  try {
    const { productId: product_id } = req.params;
    const { productsize_id, stock } = req.body;
    const productDetail = await ProductDetail.create({
      product_id,
      productsize_id: productsize_id || null,
      stock,
    });
    const data = await ProductDetail.findOne({
      where: {
        id: productDetail.id,
      },
      include: {
        association: "productSize",
      },
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in creating product detail.",
    });
  }
};

exports.deleteProductDetail = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductDetail.destroy({
      where: {
        id,
      },
    });
    return res.json({
      message: "Product detail deleted.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in creating product detail.",
    });
  }
};

exports.updateProductDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    await ProductDetail.update(
      {
        stock,
      },
      {
        where: {
          id,
        },
      }
    );
    const data = await ProductDetail.findOne({
      where: {
        id,
      },
      include: {
        association: "productSize",
      },
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in updating product detail.",
    });
  }
};
