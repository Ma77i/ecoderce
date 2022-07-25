const { verifyToken } = require("../auth");

const logger = require("../log");

module.exports = (req, res, next) => {
  
  const tokenAuth = req.headers.authorization.split(" ")[1];

  if (!verifyToken(tokenAuth)) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  logger.info("Token successfully verified");
  return next();

  
  


  // if (verifyToken(tokenAuth)) {
  //   next();
  // } else if (verifyToken(tokenCook)) {
  //   next();
  // } else if (verifyToken(tokCook1)) {
  //   next();
  // } else {
  //   res.status(401).send({ message: "Unauthorized" });
  // }
};
