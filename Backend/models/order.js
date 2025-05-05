const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customer: String,
  total: String,
  status: String,
});

module.exports = mongoose.model("Order", OrderSchema);
