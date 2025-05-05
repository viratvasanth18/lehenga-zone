const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/profile/:email", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.params.email }).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });


  router.get("/all", async (req, res) => {
    try {
        const users = await User.find().select("-password"); 
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;



