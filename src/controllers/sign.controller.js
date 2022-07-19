const { generateToken } = require("../auth");

module.exports = {
  
  login: (req, res) => {

    try {
      const token = generateToken(req.user);
      res.clearCookie("token");
      res.cookie("token", token);
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
        res.status(200).send({ user: req.user, token: token });
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
  }
};
