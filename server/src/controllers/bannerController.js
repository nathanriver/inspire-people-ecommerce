const { Banner } = require("../models");
const { cloudinary } = require("../config/cloudinary");

exports.getActiveBanners = async (req, res) => {
  try {
    const data = await Banner.findAll({
      attributes: ["image_url"],
      where: {
        is_active: true,
      },
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting banners.",
    });
  }
};

exports.getBanners = async (req, res) => {
  try {
    const data = await Banner.findAll();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting banners.",
    });
  }
};

exports.toggleActiveBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findOne({
      where: {
        id,
      },
    });
    const is_active = !banner.is_active;
    await Banner.update(
      {
        is_active,
      },
      {
        where: {
          id,
        },
      }
    );
    const data = await Banner.findOne({
      where: {
        id,
      },
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in toggle active banner.",
    });
  }
};

exports.addBanner = async (req, res) => {
  try {
    const { image } = req.body;
    const cloudinaryResponse = await cloudinary.uploader.upload(image, {
      upload_preset: "banners",
    });
    const data = await Banner.create({
      image_url: cloudinaryResponse.secure_url,
      public_id: cloudinaryResponse.public_id,
      is_active: false,
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in creating banner.",
    });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findOne({
      where: {
        id,
      },
    });
    await cloudinary.uploader.destroy(banner.public_id, (error, result) => {});
    await Banner.destroy({
      where: {
        id,
      },
    });
    return res.json({
      message: "Banner deleted.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in deleting banner.",
    });
  }
};
