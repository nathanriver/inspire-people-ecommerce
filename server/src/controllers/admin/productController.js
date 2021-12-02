const { Product } = require("../../models");
const { cloudinary } = require("../../config/cloudinary");

exports.getProducts = async (req, res) => {
  try {
    const { categoryId: category_id } = req.params;
    const data = await Product.findAll({
      where: {
        category_id,
      },
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting products.",
    });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { categoryId: category_id } = req.params;
    const { sku, slug, name, color, price, weight, summary, image } = req.body;
    const cloudinaryResponse = await cloudinary.uploader.upload(image, {
      upload_preset: "products",
    });
    const data = await Product.create({
      category_id,
      sku,
      slug,
      name,
      color,
      price,
      weight,
      summary,
      image_url: cloudinaryResponse.secure_url,
      public_id: cloudinaryResponse.public_id,
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in creating product.",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      where: {
        id,
      },
    });
    await cloudinary.uploader.destroy(product.public_id, (error, result) => {});
    await Product.destroy({
      where: {
        id,
      },
    });
    return res.json({
      message: "Product deleted.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting products.",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { sku, slug, name, color, price, weight, summary, image } = req.body;
    let productUpdate = { sku, slug, name, color, price, weight, summary };
    if (image) {
      const product = await Product.findOne({
        where: {
          id,
        },
      });
      await cloudinary.uploader.destroy(
        product.public_id,
        (error, result) => {}
      );
      const cloudinaryResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "products",
      });
      productUpdate = {
        ...productUpdate,
        image_url: cloudinaryResponse.secure_url,
        public_id: cloudinaryResponse.public_id,
      };
    }
    await Product.update(productUpdate, {
      where: {
        id,
      },
    });
    const data = await Product.findOne({
      where: {
        id,
      },
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in updating product.",
    });
  }
};
