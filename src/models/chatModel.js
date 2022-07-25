const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  author: {
    email: String,
    firstName: String,
  },
  date: {
    type: String,
    default: Date.now()
  },
  text: {
    type: String,
    required: true,
    maxlength: 200
  }
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
