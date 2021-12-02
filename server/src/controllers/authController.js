const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.validate = async (req, res) => {
  try {
    const user = req.user;
    return res.json({
      name: user.name,
      email: user.email,
      isAdmin: user.role === "Admin",
    });
  } catch (error) {
    return res.status(400).json({ message: "Internal server error." });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      return res
        .status(400)
        .json({ message: "The email has already been taken." });
    }
    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(password, saltRounds);
    const newUser = await User.create({
      ...req.body,
      password: passwordHash,
      role: "User",
    });
    const token = jwt.sign(
      {
        id: newUser.uuid,
      },
      JWT_SECRET
    );
    return res.json({
      name: newUser.name,
      email: newUser.email,
      isAdmin: false,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error in creating user" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      {
        id: user.uuid,
      },
      JWT_SECRET
    );
    return res.json({
      name: user.name,
      email: user.email,
      isAdmin: user.role === "Admin",
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Login error" });
  }
};
