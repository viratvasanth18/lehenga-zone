const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Save user in database
    const newUser = new User({ name, email, mobile, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // ✅ Remove password from response
        const { password: _, ...userWithoutPassword } = user._doc;

        res.json({ message: "Login successful", user: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

  

  module.exports = router;