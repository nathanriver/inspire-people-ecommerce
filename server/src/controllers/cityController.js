const { City } = require("../models");

exports.getCities = async (req, res) => {
  try {
    const { province_id } = req.query;
    if (!province_id) {
      return res.status(400).json({
        message: "Province id not found.",
      });
    }
    const data = await City.findAll({
      where: {
        province_id,
      },
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting cities.",
    });
  }
};
