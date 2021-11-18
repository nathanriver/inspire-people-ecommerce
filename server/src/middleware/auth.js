const JWT = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res
        .status(401)
        .send({ message: "Token not found. Authorization denied." });
    }
    const decodedToken = JWT.verify(token, process.env.JWT_SECRET);
    if (!decodedToken.id) {
      return res
        .status(401)
        .send({ message: "Token verification failed. Authorization denied." });
    }
    req.userId = decodedToken.id;
    next();
  } catch (error) {
    res.status(500).send({ message: "Internal server error." });
  }
};

module.exports = auth;
