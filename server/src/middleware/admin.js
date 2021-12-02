const admin = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== "Admin") {
      return res.status(401).send({ message: "Authorization denied." });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: "Internal server error." });
  }
};

module.exports = admin;
