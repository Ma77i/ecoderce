const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  user: String,
  cart: [],
  total: { type: Number, default: 0 },
  created: { type: Date, default: Date.now },
  send: {
    type: Boolean,
    default: false
  }
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
