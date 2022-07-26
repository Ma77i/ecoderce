// normalizr
const { schema, normalize } = require("normalizr");

// models
const chatModel = require("../models/chatModel");

// logger
const logger = require("../log/winston");

module.exports = {

  getAll: async (req, res) => {
    const chat = await chatModel.find();
    logger.info("Chats successfully retrieved from database")
    res.status(200).json({
      message: "Chats successfully retrieved from database",
      chat: chat,
    });
  },

  getById: async (req, res) => {
    const { id } = req.params;
   
    try {
      const chat = await chatModel.findById(id);
      logger.info("Chat successfully retrieved from database")
      res.status(200).json({
        message: "Chat successfully retrieved from database",
        chat: chat
      });
    } catch (error) {
      logger.error("Chat failed to retrieve from database", error);
      res.status(500).send(error);
    }
  },

  createText: async (req, res) => {
    const { body } = req;
    console.log(req.body);
    try {
      const text = await chatModel.create({body});
      logger.info("Message successfully created in database");
      res.status(201).json({
        message: "Message successfully created in database",
        text: text
      })
    } catch (error) {
      logger.error("Message failed to be created", error);
      res.status(500);
    }
  },

  put: (req, res) => {
    res.send("ok");
  },

  // borrar mensaje
  deleteById: async (req, res) => {
    const { id } = req.params;
    try {
      await chatModel.deleteOne({_id: id});
      const chats = await chatModel.find();
      logger.info("Message successfully deleted from database");
      res.status(200).json({
        message: "Message successfully deleted from database",
        chats: chats
      })
    } catch (error) {
      logger.error("Message failed to be deleted", error);
      res.status(500);
    }
  },

  // borrar todos los mensajes
  deleteAll: async (req, res) => {
    try {
      await chatModel.deleteMany();
      const chats = await chatModel.find();
      res.status(200).json({
        message: "All messages successfully deleted from database",
        chats: chats
      })
    } catch (error) {
      logger.error("All messages failed to be deleted", error);
      res.status(500).send(error);
    }
  },

  getNorm: async () => {
    const author = new schema.Entity("authors", {}, { idAttribute: "email" });
    const chat = new schema.Entity("chats", {
      author: author
    });

    const data = new schema.Entity("data", {
      chats: [chat]
    });

    const chatDB = await chatModel.find({});

    const normalizedData = normalize(
      {
        id: "chats",
        mensajes: chatDB.map((d) => {
          author: d.author;
          text: d.text;
          date: d.date;
          id: d._id.toString();
        })
      },
      data
    );
    console.log(normalizedData);
    return normalizedData;
  }
};
