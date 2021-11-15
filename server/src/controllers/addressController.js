const { User, Address } = require("../models");

exports.getUserAddresses = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: "1ecab83a-9549-4cd9-b2b2-60f1857d9c8d",
      },
    });
    const data = await Address.findAll({
      where: {
        user_id: user.id,
      },
      attributes: {
        exclude: ["id", "user_id"],
      },
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting addresses",
    });
  }
};
