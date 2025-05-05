const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// Add product to database
router.post("/", async (req, res) => {
  try {
    const { name, img, price, discount, rating, category } = req.body;
    const productExists = await Product.findOne({ name });

    if (productExists) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const product = new Product({ name, img, price, discount, rating, category });
    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/", async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });


  // Example in Express.js
  router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

router.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const products = await Product.find({
      name: { $regex: query, $options: "i" }
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
  

module.exports = router;

