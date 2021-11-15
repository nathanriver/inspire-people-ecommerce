const { Banner } = require("../models");

exports.getBanners = async (req, res) => {
  try {
    const data = await Banner.findAll({
      where: {
        is_active: true,
      },
      attributes: ["image_url"],
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting banners",
    });
  }
};
