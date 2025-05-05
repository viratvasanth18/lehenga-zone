const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// Fetch all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Error fetching orders" });
  }
});

module.exports = router;