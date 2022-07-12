const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = {
  generateToken: (user) => {
    return jwt.sign({ user }, config.SECRET, { expiresIn: "1h" });
  },
  verifyToken: (token) => {
    console.log("Verifying token: " + token)
    return jwt.verify(token, config.SECRET )
  }
}
