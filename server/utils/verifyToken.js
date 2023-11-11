const jwt = require("jsonwebtoken");

const verifyToken = (req) => {
  const token = req.cookies.token;
  const verified = jwt.verify(token, process.env.TOKEN_SECRET);
  return verified;
};

module.exports = verifyToken;
