const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  img: String,
  price: Number,
  discount: Number,
  rating: Number,
  category: String,
  rating: { type: Number, min: 1, max: 5 }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
