const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/model.js");
const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
    try {
      const { email, username, password } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ msg: "You already have an account" });
  
      const user = await User.create({ email, username, password });
  

      const token = jwt.sign({ id: user._id }, process.env.mytoken, { expiresIn: "100d" });
  
      res.status(201).json({
        id: user._id,
        username: user.username,
        email: user.email,
        token, 
        msg: "You have successfully signed up",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error" });
    }
  });
// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.mytoken, {
      expiresIn: "100d",
    });

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
