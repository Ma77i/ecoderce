const { verifyToken } = require("../auth");

module.exports = (req, res, next) => {
  // console.log("AuthHeader:", req.headers.authorization);
  // console.log("HEADER: ", req.headers);
  // const tokenAuth = req.headers.authorization.split(" ")[1];
  const tokCook1 = req.headers.cookie.split("=")[2];
  const tokenCook = req.headers.cookie.split(" ")[1];

  if (verifyToken(tokCook1)) {
    return next();
  }

  // if (verifyToken(tokenAuth)) {
  //   return next();
  // }

  if (verifyToken(tokenCook)) {
    return next();
  }

  return res.status(401).send({ message: "Unauthorized" });
};
