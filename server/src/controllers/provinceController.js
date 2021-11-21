const { Province } = require("../models");

exports.getProvinces = async (req, res) => {
  try {
    const data = await Province.findAll();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting provinces.",
    });
  }
};
