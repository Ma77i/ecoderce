/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
// import models
const cartModel = require("../models/cartModel");
const prodModel = require("../models/productsModel");

// logger
const logger = require("../log/winston");

module.exports = {
  // obtener todos los carritos
  getAll: async (req, res) => {
    const cart = await cartModel.find().lean();

    if (cart.length === 0) {
      logger.info("No carts found");
    } else {
      logger.info(`Carts listed: ${cart.length}`);
    }

    res.status(200).json({
      message: "Carts successfully retrieved",
      cart: cart
    });
  },

  // obtener un carrito por id
  getCartById: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(404);
    }

    try {
      const cart = await cartModel.findById({ _id: id });
      logger.info(`Cart listed, products: ${cart.products.length}`);
      res.status(200).json({
        message: "Cart successfully retrieved",
        cart: cart
      });
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  },

  // obtener un carrito por usuario
  getCartByUser: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(404).send("No user found");
    }

    try {
      const cart = await cartModel.findOne({ user: id.toString() });
      res.status(200).json({
        message: "Cart successfully retrieved",
        cart: cart
      });
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  },

  // agregar producto al carrito
  postCart: async (req, res) => {
    const { id, idprod } = req.params;

    const cart = await cartModel.findById({ _id: id });
    const productToAdd = await prodModel.findById({ _id: idprod });
    const isIn = cart.products.find(i=>i._id.toString() === idprod);
    try {

      if (!isIn) {
        cart.products.push(productToAdd);
        await cart.save();
        logger.info("Product successfully added to cart");
      } else {
        toReplace = cart.products.find(i=>i._id.toString() === idprod)
        cart.products.splice(cart.products.indexOf(toReplace), 1);
        toReplace.quantity += 1
        cart.products.push(toReplace);
        await cart.save();
        logger.info(`${productToAdd.title} already exists in cart, added quantity: ${productToAdd.quantity}`);
      }
      
      res.status(201).json({
        message: "Product successfully added to cart",
        cart: cart
      });
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  },

  // borrar un carrito
  deleteCart: async (req, res) => {
    const { id } = req.params;
    try {
      await cartModel.deleteOne({ _id: id });
      const carts = await cartModel.find();
      logger.info("Cart successfully deleted");
      res.status(200).json({
        message: "Cart successfully deleted",
        carts: carts
      });
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  },

  // vaciar un carrito
  emptyCart: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(404);
    }

    try {
      const cart = await cartModel.findById({ _id: id });
      cart.products = [];
      await cart.save();
      logger.info("Cart successfully emptied");
      res.status(200).json({
        message: "Cart successfully emptied",
        cart: cart
      });
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  },

  // borrar producto del carrito
  deleteProd: async (req, res) => {
    const { id, product } = req.params;

    try {
      const cart = await cartModel.findById({ _id: id });
      cart.products = cart.products.filter( i => i._id.toString() !== product);
      await cart.save();
      logger.info("Product successfully deleted from cart");
      res.status(200).json({
        message: "Product successfully deleted from cart",
        cart: cart
      });
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  },

  // borrar todo
  deleteAll: async (req, res) => {
    try {
      await cartModel.deleteMany({});
      const carts = await cartModel.find();
      logger.info("Carts successfully deleted");
      res.status(200).json({
        message: "Carts successfully deleted",
        carts: carts
      });
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  },

  getProductsLength: async (req, res) => {
    const { id } = req.params;
    const cart = await cartModel.findById({ _id: id }).lean();
    return cart.products.length;
  },

  // GET Cart
  getCurrentCart: async (req, res) => {
    // const userId = req.user;
    const { id } = req.params;

    try {
      // const cart = await cartModel.findOne({ user: userId._id.toString() });
      const cart = await cartModel.findOne({ user: id });
      res.json({ 
        message: "Cart successfully processed",
        cartId: cart._id, 
        cart: cart
       });
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  }
};
