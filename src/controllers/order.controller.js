/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
// import models
const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const cartModel = require("../models/cartModel");

// twilio
const twilioSender = require("../notifications/twilio");

// logger
const logger = require("../log/winston");

module.exports = {

  getAll: async (req, res) => {
    try {
      const orders = await orderModel.find().lean();
      res.status(200).json({
        message: "Orders successfully retrieved",
        orders: orders
      });
    } catch (err) {
      console.log(err);
      logger.error(err);
      res.status(500).json({ message: "Error" });
    }
  },

  save: async (req, res) => {
    
    const { id } = req.params;
    const context = { sent: false };
    
    try {
      const user = await userModel.findById(id);

      const cart = await cartModel.findOne({ user: id });
      const total = cart.products.reduce((tot, p) => tot + p.price * p.quantity, 0);
      const order = await orderModel.create({
        user: user._id.toString(),
        cart: cart,
        total: total
      });
      cart.products = [];
      await cart.save();

      context.sent = true;
      logger.info("Order successfully created");
      res.status(200).json({
        message: "Order successfully created",
        context: context,
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
    // const { firstName, email } = req.user;

    if (!id) {
      return res.sendStatus(404);
    }

    try {
      const update = await orderModel.updateOne({ _id: id }, { send: true });
      const orders = await orderModel.findById(id);
      console.log(order);
      await order.save();
      
      // twilioSender.sendSms(firstName, email);
      twilioSender.sendSms("firstName", "email");
      logger.info("Order successfully updated");
      res.sendStatus(202).json({
        message: "Order successfully updated",
        order: orders
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  deleteOrder: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(404);
    }

    try {
      const order = await orderModel.findById({ _id: id });
      await order.remove();
      res.sendStatus(202);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }

  },
  
  deleteAllOrders: async (req, res) => {
    await orderModel.deleteMany();
    logger.info("Ordenes eliminadas con exito");
    res.status(200).redirect("/");
  },

  // obtengo la order mediante id de usuario
  getByUser: async (req, res) => {
    // const userId = req.user;
    const { id } = req.params;

    const order = await orderModel.findOne({ userId: userId._id }).lean();

    if (!order) {
      return {};
    }

    logger.info(`Orden del usuario con id: ${order.userId}`);
    res.status(200).send(order);
  }
}





// // obtengo todas las ordenes de pedido
// exports.getAll = async (req, res) => {
//   const data = await orderModel.find().lean();
//   logger.info(`Ordenes: ${data.length}`);
//   res.status(200).send(data);
// };

// // guardo las ordenes en la db
// exports.save = async (req, res) => {
//   const order = await orderModel.create();
//   logger.info(`Orden:\n${order}`);
//   res.status(201).send(order);
// };

// // elimino todas las ordenes
// exports.deleteAllOrders = async (req, res) => {
//   await orderModel.deleteMany();
//   logger.info("Ordenes eliminadas con exito");
//   res.status(200).redirect("/");
// };
 
// // obtengo la order mediante id de usuario
// exports.getByUser = async (req, res) => {
//   const userId = req.user;

//   const order = await orderModel.findOne({ userId: userId._id }).lean();

//   if (!order) {
//     return {};
//   }

//   logger.info(`Orden del usuario con id: ${order.userId}`);
//   res.status(200).send(order);
// };



// // update sent order
// exports.updateSendOrder = async (req, res) => {
//   const { id } = req.params;
//   const { firstName, email } = req.user;

//   if (!id) {
//     return res.sendStatus(404);
//   }

//   try {
//     const order = await orderModel.findById({ _id: id });
//     order.send = true;
//     await order.save();

//     twilioSender.sendSms(firstName, email);
//     res.sendStatus(202);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// };
