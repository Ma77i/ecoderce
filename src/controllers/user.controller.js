/* eslint-disable consistent-return */
// import models
const userModel = require("../models/userModel");

// logger
const logger = require("../log/winston");

module.exports = {

  
  getAllUsers: async (req, res) => {
    const users = await userModel.find().lean();
    logger.info(`Users: ${users.length}`);
    res.status(200).json({
      message: "Users successfully retrieved",
      users: users
    });
  },

  getUserId: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(404);
    }

    try {
      const user = await userModel.findById({ _id: id }).lean();
      logger.info(`User: ${user.firstName}`);
      res.status(200).json({ 
        message: "User successfully retrieved",
        user: user
      });
    } catch (err) {
      logger.error(`No id find, ${err}`);
      res.status(500).send(err);
    }
  },

  // borrar todo
  deleteAll: async (req, res) => {
    try {
      await userModel.deleteMany({});
      const users = await userModel.find();
      logger.info("Users successfully deleted");
      res.status(200).json({
        message: "Users successfully deleted",
        users: users
      });
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  },

  deleteOne: async (req, res) => {
    const { id } = req.params;
    try {
      await userModel.deleteOne({ _id: id });
      const users = await userModel.find();
      logger.info("User successfully deleted");
      res.status(200).json({
        message: "User successfully deleted",
        users: users
      });
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  }
};
