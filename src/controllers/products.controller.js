// import model
const productModel = require("../models/model.factory");

const logger = require("../log");

module.exports = {
  // obtener todos los productos, ordernarlos y buscar por nombre
  get: async (req, res) => {
    const { orderBy, search } = req.query;

    let products = [];
    const find = search ? { title: { $regex: search, $options: "i" } } : {};
    if (orderBy) {
      const ord = {};
      ord[orderBy] = 1;
      products = await productModel.getModel("product").find(find).sort(ord);
    } else {
      products = await productModel.getModel("product").find(find);
    }

    logger.info(`Products listed: ${products.length}`);
    return res.status(200).json({
      message: "Products successfully retrieved",
      products: products
    });
  },

  // obtener producto por id
  getById: async (req, res) => {
    const { id } = req.params;

    try {
      const product = await productModel.getModel("product").findOne({ _id: id });
      res.status(200).json({
        message: "Product successfully retrieved",
        product: product
      });
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  },

  // crear producto
  post: async (req, res) => {
    const { body } = req;

    try {
      const product = await productModel.getModel("product").create(body);
      logger.info(`Product successfully created: ${product.title}`);
      res.status(201).json({
        message: "Product successfully created",
        product: product
      });
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  },

  // actualizar producto
  put: async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    try {
      const update = await productModel.getModel("product").updateOne({ _id: id }, { $set: body });
      const product = await productModel.getModel("product").findById({_id: id});
      res.status(201).json({
        message: "Product successfully updated",
        product: product
      });
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  },

  // borrar producto
  deleteProd: async (req, res) => {
    const { id } = req.params;

    try {
      await productModel.getModel("product").deleteOne({ _id: id });
      const products = await productModel.getModel("product").find();
      res.status(200).json({
        message: "Product successfully deleted",
        products: products
      });
    } catch (err) {
      logger.error(`No id find${err}`);
      res.status(500).json({
        message: "Error al borrar producto",
        error: err
      });
    }
  },

  // borrar todos los productos
  deleteAll: async (req, res) => {
    await productModel.getModel("product").deleteMany({});
    const products = await productModel.getModel("product").find();
    res.status(200).json({
      message: "Products successfully deleted",
      products: products
    })
  }
};
