const { User, Address } = require("../models");

exports.getUserAddresses = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.userId,
      },
    });
    const data = await Address.findAll({
      where: {
        user_id: user.id,
      },
      attributes: {
        exclude: ["id", "user_id"],
      },
      order: [["is_default", "DESC"]],
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting addresses.",
    });
  }
};

exports.addAddress = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.userId,
      },
    });
    await Address.update(
      { is_default: false },
      {
        where: {
          user_id: user.id,
        },
      }
    );
    await Address.create({
      ...req.body,
      user_id: user.id,
      is_default: true,
    });
    const data = await Address.findAll({
      where: {
        user_id: user.id,
      },
      attributes: {
        exclude: ["id", "user_id"],
      },
      order: [["is_default", "DESC"]],
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in adding address.",
    });
  }
};

exports.deleteAddress = async (req, res) => {
  const { id } = req.params;
  try {
    await Address.destroy({
      where: {
        uuid: id,
      },
    });
    return res.json("Address deleted.");
  } catch (error) {
    return res.status(500).json({
      message: "Error in deleting address.",
    });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        uuid: req.userId,
      },
    });
    if (req.body.is_default) {
      await Address.update(
        { is_default: false },
        {
          where: {
            user_id: user.id,
          },
        }
      );
    }
    await Address.update(req.body, {
      where: {
        uuid: id,
      },
    });
    const data = await Address.findAll({
      where: {
        user_id: user.id,
      },
      attributes: {
        exclude: ["id", "user_id"],
      },
      order: [["is_default", "DESC"]],
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error in updating address.",
    });
  }
};
