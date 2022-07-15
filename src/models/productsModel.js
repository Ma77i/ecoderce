const faker = require("faker");
const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
  title: {
    type: String,
    default: faker.commerce.product()
  },
  description: {
    type: String,
    default: faker.commerce.productDescription()
  },
  price: {
    type: Number,
    default: faker.commerce.price(100, 5000)
  },
  stock: {
    type: Number,
    default: faker.datatype.number({ min: 1, max: 20 })
  },
  code: {
    type: String,
    default: faker.datatype.uuid()
  },
  thumbnail: {
    type: String,
    default: faker.image.business()
  },
  quantity: {
    type: Number,
    default: 1
  },
  timestamp: {
    type: Number,
    default: Date.now()
  }
});

const Products = mongoose.model("products", ProductsSchema);

module.exports = Products;
