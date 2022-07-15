/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
// import router
const router = require("express").Router();

const { generateToken } = require("../auth");

// multer
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// passport
const passport = require("passport");

// logger
const logger = require("../log/winston");

// mail sender
const mailSender = require("../notifications/mail");

// twilio sms sender
const twilioSender = require("../notifications/twilio");

// import models
const productModel = require("../models/productsModel");
const cartModel = require("../models/cartModel");
const orderModel = require("../models/orderModel");

// import controllers
const orderController = require("../controllers/order.controller");

// middlewares
const auth = require("../middlewares/auth");
const authJWT = require("../middlewares/jwt.middleware");


// GET store template hbs
router.get("/", auth,  authJWT, async (req, res) => {
  const user = req.user;

  try {
    const prods = await productModel.find().lean();
    const cart = await cartModel.findOne({ user: user._id.toString() });
    res.status(200).render("main",{
      firstName: user.firstName,
      cartId: cart._id,
      products: prods
    });
  } catch (err) {
    console.log(err);
    logger.error(err);
    res.status(500).send(err);
  }
});


// GET Login
router.get("/login", (req, res) => res.render("login"));

// POST Login
router.post(
  "/login",
  passport.authenticate("login", {
    failureFlash: true
  }),
  (req, res) => {
    const token = generateToken(req.user);
    res.clearCookie("token");
    res.cookie("token", token);
    res.status(200).redirect("/");
  }
);


// GET Register
router.get("/register", async (req, res) => res.render("register"));

// POST Register
router.post(
  "/register",
  passport.authenticate("register", {
    failureFlash: true
  }),
  (req, res) => {
    const token = generateToken(req.user);
    res.clearCookie("token");
    res.cookie("token", token);
    res.status(200).redirect("/");
  }
);

// GET Loguot
router.get("/logout", auth, (req, res) => {
  const { firstName } = req.user;
  req.logOut();
  res.clearCookie("token");
  res.render("logout", { firstName });
});

// add avatar image
router.get("/addAvatar", auth, (req, res) => {
  try {
    res.status(200).render("addAvatar");
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
});

// upload avatar
router.post("/addAvatar", upload.single("avatar"), orderController.updateAvatar);

// GET Cart
router.get("/cart", auth, authJWT, async (req, res) => {
  const userId = req.user;

  try {
    const cart = await cartModel.findOne({ user: userId._id.toString() });
    const products = await Promise.all(
      cart.products.map((pId) => productModel.findById(pId).lean())
    );
    const total = products.reduce((tot, p) => tot + p.price, 0);

    logger.info(`Productos en el carrito: ${cart.products.length}`);
    res.render("cart", { cartId: cart._id, products, total });
  } catch (error) {
    console.log(error);
    logger.error(error);
    res.status(500).send(error);
  }
});

// GET Order
router.get("/order", auth, async (req, res) => {
  const { email, firstName, phone } = req.user;
  const userId = req.user;
  const context = { sent: false };

  const cart = await cartModel.findOne({ user: userId._id.toString() });
  const products = await Promise.all(
    cart.products.map((pId) => productModel.findById(pId).lean())
  );
  const total = products.reduce((tot, p) => tot + p.price, 0);

  try {
    await orderModel.create({
      userId: userId._id.toString(),
      total
    });
    cart.products = [];
    await cart.save();

    const prodElements = products.map((p) => `<li>${p.title}</li>`);
    const template = `
        <h1 style="color: blue;"> Tu pedido esta siendo procesado </h1>
        <p>Aqui tus productos: </p>
        <ul>
          ${prodElements.join(" ")}
        </ul>
      `;
    mailSender.send(template, email, firstName);
    twilioSender.sendSms(firstName, email);
    twilioSender.sendWhatsapp(phone, firstName, email);

    context.sent = true;
    logger.info("Orden realizada con exito");
  } catch (err) {
    console.log(err);
    logger.error(err);
    res.status(500).send(err);
  }

  res.render("order", context);
});

// GET profile
router.get("/account", auth, async (req, res) => {
  const { firstName, lastName, avatar, userName, email } = req.user;
  res.render("account", { firstName, lastName, avatar, userName, email });
});

// error
router.get("*", (req, res) => {
  logger.warn("la ruta no existe");
  res.status(404).send("Not Found");
});

module.exports = router;
