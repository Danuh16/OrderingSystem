const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/UserSchema");

const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret_key";

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullName, username, password, role } = req.body;

    // Ensure username is provided and not null
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    let existingUser = await User.findOne({ username });
    if (existingUser) {
      // If the existing user has a null username, update it
      if (existingUser.username === null) {
        existingUser.username = username;
        await existingUser.save();
      } else {
        return res.status(400).json({ message: "Username already exists" });
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser = new User({
        fullName,
        username,
        password: hashedPassword,
        role,
      });
      await existingUser.save();
    }

    const token = jwt.sign({ userId: existingUser._id, role: existingUser.role }, JWT_SECRET);
    res
      .status(201)
      .json({ token, user: { id: existingUser._id, fullName, username, role } });
  } catch (err) {
    // Check for the specific duplicate key error
    if (err.code === 11000 && err.keyPattern && err.keyPattern.username) {
      return res.status(400).json({ message: "Username already exists" });
    }
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password } = req.body;

    // Ensure username is provided and not null
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET);
    res.json({ token, user: { id: user._id, username, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
