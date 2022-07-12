module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
    // return res.status(401).send({ message: "U Are Unauthorized" });
  }
  return next();
};

