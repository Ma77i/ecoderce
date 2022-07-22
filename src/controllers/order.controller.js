/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
// import models
const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const cartModel = require("../models/cartModel");

// twilio
const twilioSender = require("../notifications/twilio");
const mailSender = require("../notifications/mail");
// logger
const logger = require("../log/winston");

module.exports = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await orderModel.find();
      res.status(200).json({
        message: "Orders successfully retrieved",
        orders: orders
      });
    } catch (err) {
      logger.error(err);
      res.status(500).json({
        message: "Error",
        error: err
      });
    }
  },

  saveOrder: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await userModel.findById(id);
      const cart = await cartModel.findOne({ user: id });
      const total = cart.products.reduce((tot, p) => tot + p.price * p.quantity, 0);
      const order = await orderModel.create({
        user: user._id.toString(),
        cart: cart,
        total: total
      });

      const elements = cart.products.map((p) => `<li>${p.title}</li>`);
      const template = `
        <h1> Your order is being processed, we will notify you when it is shipped: </p>
        <ul>
          <li>${elements.join(" ")}</li>
        </ul>
        <p>Total: ${total}</p>
      `;
      mailSender.orderSaved(template, user.email, user.firstName);
      twilioSender.sendSms(user.phone, user.firstName, user.email);

      cart.products = [];
      await cart.save();
      logger.info("Order successfully created");
      res.status(200).json({
        message: "Order successfully created",
        order: order
      });
    } catch (error) {
      logger.error(error);
      res.status(500).json({
        message: "Error",
        error: error
      });
    }
  },

  updateSendOrder: async (req, res) => {
    const { id } = req.params;

    try {
      await orderModel.updateOne({ _id: id }, { $set: { send: true } });
      const orders = await orderModel.find();
      const user = await userModel.findById({ _id: orders[0].user });

      logger.info("Order successfully updated");

      const template = `<h1> Congratulations Your order has been sent to your address</h1>`;
      mailSender.OrderSent(template, user.email, user.firstName);
      twilioSender.sendWhatsapp(user.phone, user.firstName, user.email);

      res.status(202).json({
        message: "Order successfully updated",
        orders: orders
      });
    } catch (err) {
      logger.error("The order was not updated", err);
      res.status(500).send(err);
    }
  },

  deleteOrder: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(404);
    }

    try {
      await orderModel.deleteOne({ _id: id });
      const orders = await orderModel.find();
      logger.info("Order successfully deleted");
      res.status(202).json({
        message: "Order successfully deleted",
        orders: orders
      });
    } catch (err) {
      logger.error("The order was not deleted", err);
      res.status(500).send(err);
    }
  },

  deleteAllOrders: async (req, res) => {
    await orderModel.deleteMany();
    const orders = await orderModel.find();
    logger.info("Orders successfully deleted");
    res.status(200).json({
      message: "Orders successfully deleted",
      orders: orders
    });
  },

  // obtengo la order mediante id de usuario
  getByUser: async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.findOne({ user: id }).lean();

    logger.info(`Order successfully retrieved: ${order}`);
    res.status(200).json({
      message: "Order successfully retrieved",
      order: order
    });
  }
};
