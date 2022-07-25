const { generateToken } = require("../auth");

const logger = require("../log");

module.exports = {
  
  login: (req, res) => {

    try {
      const token = generateToken(req.user);
      res.clearCookie("token");
      res.cookie("token", token);

      logger.info(`User ${req.user.userName} logged in`);
      res.status(200).json({ 
        message: "Login successful",
        user: req.user, 
        token: token 
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something is not right",
        error: error,
      });
    }
  },

  register: (req, res) => {
    try {
      const token = generateToken(req.user);
        res.clearCookie("token");
        res.cookie("token", token);

      logger.info(`User ${req.user.userName} registered`);
        res.status(200).json({ 
          message: "Register successful",
          user: req.user, 
          token: token });
      } catch (error) {
        return res.status(500).json({
          message: "Something is not right",
          error: error,
        });
      }
  },
  
  logout: (req, res) => {
    req.logout();
    res.clearCookie("token");
    res.status(200).send("Logout");
  },

  // // upload image
  updateAvatar: async (req, res, next) => {
    const img = req.file;
    if (!img) {
      logger.warn("Add a image");
    }
    const user = req.user;
    try {
      await userModel.findByIdAndUpdate(
        { _id: user._id },
        { avatar: `/static/img/${img.originalname}` }
      );
      res.status(201).redirect("/");
    } catch (err) {
      logger.error(err);
      res.status(500).send(err);
    }
  }
};
