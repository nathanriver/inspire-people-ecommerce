const { Banner, User } = require("../models");
const JWT = require("jsonwebtoken");

exports.getBanners = async (req, res) => {
  try {
    const { showMode } = req.query;
    const token = req.header("x-auth-token");
    let bannerWhere = {
      is_active: true,
    };
    let bannerAttributes = ["image_url"];
    if (!showMode) {
      if (token) {
        const decodedToken = JWT.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({
          where: {
            uuid: decodedToken.id,
          },
        });
        if (user.role === "Admin") {
          bannerWhere = {};
          bannerAttributes = {};
        }
      }
    }
    const data = await Banner.findAll({
      where: bannerWhere,
      attributes: bannerAttributes,
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting banners",
    });
  }
};
