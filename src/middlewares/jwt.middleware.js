const { verifyToken } = require("../auth");

module.exports = (req, res, next) => {
  console.log("AuthHeader:", req.headers.authorization);
  console.log("HEADER: ", req.headers)
  const token = req.headers.authorization.split(" ")[1];
  console.log("TOKEN MIDDLEWARE: ", token);

  // const tok = token.split(";")[0];
  // console.log("TOKEN MIDDLEWARE: ", tok);

  if (!verifyToken(token)) {
    console.log("Invalid token, verify failed");
    return res.status(401).send({ message: "Unauthorized" });
  }

  return next();
};
