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
    const products = await cartModel.find().lean();

    if (products.length === 0) {
      logger.info("Carrito vacio");
    } else {
      logger.info(`Carritos listados: ${products.length}`);
    }

    res.status(200).send(products);
  },

  // obtener un carrito por id
  getCartById: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.sendStatus(404);
    }

    try {
      const cart = await cartModel.findById({ _id: id });
      logger.info(`CarritoId: ${id}`);
      res.status(200).send(cart);
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  },

  // obtener un carrito por usuario
  getCartByUser: async (req, res) => {
    const { id } = req.params;
    console.log("IDS", id);

    if (!id) {
      return res.status(404).send("No hay usuario");
    }

    try {
      const cart = await cartModel.findOne({ user: id.toString() });
      console.log("CARRITO", cart);
      res.status(200).send(cart);
    } catch (error) {
      console.log("error get cart by user", error);
      logger.error(error);
      res.status(500).send(error);
    }
  },

  // agregar producto al carrito
  postCart: async (req, res) => {
    const { id, idprod } = req.params;

    try {
      const cart = await cartModel.findById({ _id: id });
      const productToAdd = await prodModel.findById({ _id: idprod });
      const isIn = cart.products.find(i=>i._id.toString() === idprod);

      if (!isIn) {
        cart.products.push(productToAdd);
        await cart.save();
        logger.info("Producto agregado con exito");
      } else {
        const toAdd = cart.products.find(i=>i._id.toString() === idprod)
        toAdd.quantity += 1;
        cart.products.push(toAdd);
        // console.log("TOADD", toAdd);
        // productToAdd.quantity += 1;
        // console.log("PRODUCTO", productToAdd);

        await cart.save();
        logger.info(`Producto ${productToAdd.title} ya existe en el carrito, se agrega cantidad, total: ${productToAdd.quantity}`);
      }
      
      res.status(201).send(cart);
    } catch (error) {
      console.log(error);
      logger.error(error);
      res.status(500).send(error);
    }
  },

  // borrar un carrito
  deleteCart: async (req, res) => {
    const { id } = req.params;
    try {
      await cartModel.deleteOne({ _id: id });
      logger.info("Carrito borrado con exito");
      res.status(200).send("Cart deleted");
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
      logger.info("Carrito vaciado con exito");
      res.status(200).send("Cart empty");
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
      cart.products = cart.products.filter((i) => i._id !== product);
      console.log(cart.products);
      await cart.save();
      logger.info("Producto borrado con exito");
      res.status(200).send(cart);
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  },

  // borrar todo
  deleteAll: async (req, res) => {
    try {
      await cartModel.deleteMany({});
      logger.info("Se eliminaron todos los carritos");
      res.status(200).send("Empty");
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
      const products = await Promise.all(
        cart.products.map((pId) => prodModel.findById(pId).lean())
      );
      const total = products.reduce((tot, p) => tot + p.price, 0);
      res.send({ 
        cartId: cart._id, 
        products: products, 
        total: total
       });
    } catch (error) {
      console.log(error);
      logger.error(error);
      res.status(500).send(error);
    }
  }
};
