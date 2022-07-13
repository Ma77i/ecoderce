const router = require("express").Router();
const passport = require("passport");
const controller = require("../controllers/sign.controller");

// login
router.post(
  "/login",
  passport.authenticate("login", {
    failureFlash: true
  }),
  controller.login
);

// register
router.post(
  "/register",
  passport.authenticate("register", { failureFlash: true }),
  controller.register
);

// logout
router.get("/logout", controller.logout);

module.exports = router;
