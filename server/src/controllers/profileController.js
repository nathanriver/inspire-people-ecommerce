const { User } = require("../models");

exports.updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    await User.update(
      {
        name,
      },
      {
        where: {
          uuid: req.userId,
        },
      }
    );
    const data = await User.findOne({
      attributes: ["name"],
      where: {
        uuid: req.userId,
      },
    });
    return res.json(data.name);
  } catch (error) {
    return res.status(500).json({
      message: "Error in updating profile.",
    });
  }
};
