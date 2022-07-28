const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  author: {
    type: String,
  },
  date: {
    type: String,
    default: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
  },
  text: {
    type: String,
    maxlength: 200
  }
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
