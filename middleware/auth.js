const jwt = require("jsonwebtoken");
const config = require("../config");

const { JWT_SECRET } = config;

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token)
    return res.status(401).json({ noToken: "No token, authorizaton denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ expired: "Session Expired. Login Again" });
  }
};
