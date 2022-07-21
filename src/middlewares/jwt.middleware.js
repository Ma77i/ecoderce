const { verifyToken } = require("../auth");

module.exports = (req, res, next) => {
  // console.log("HEADER: ", req.headers);
  const tokenAuth = req.headers.authorization.split(" ")[1];
  // const tokCook1 = req.headers.cookie.split("=")[2];
  // const tokenCook = req.headers.cookie.split(" ")[1];

  if (!verifyToken(tokenAuth)) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  console.log("Token successfully verified");
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
