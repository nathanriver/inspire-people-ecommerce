const { User } = require("../models");
const bcrypt = require("bcryptjs");

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

exports.changePassword = async (req, res) => {
  try {
    const { old_password, new_password } = req.body;
    const user = await User.findOne({
      where: {
        uuid: req.userId,
      },
    });
    const validPassword = bcrypt.compareSync(old_password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Old password invalid." });
    }
    const saltRounds = 10;
    const newPasswordHash = bcrypt.hashSync(new_password, saltRounds);
    await User.update(
      {
        password: newPasswordHash,
      },
      {
        where: {
          uuid: req.userId,
        },
      }
    );
    res.json({ message: "Password changed." });
  } catch (error) {
    return res.status(500).json({
      message: "Error in changing password.",
    });
  }
};
