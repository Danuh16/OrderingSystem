const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/UserSchema");
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || "591be5a2df5124a0285572d9f3f2db152edcb5cdc5a0c13359127f26a8b96eb2";


exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { firstName, lastName, username, password, role } = req.body;

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
        firstName,
        lastName,
        username,
        password: hashedPassword,
        role,
      });
      await existingUser.save();
    }

    const token = jwt.sign(
      { userId: existingUser._id, role: existingUser.role },
      JWT_SECRET
    );
    res
      .status(201)
      .json({
        token,
        user: { id: existingUser._id,firstName ,lastName, username, role },
      });
  } catch (err) {
    // Check for the specific duplicate key error
    if (err.code === 11000 && err.keyPattern && err.keyPattern.username) {
      return res.status(400).json({ message: "Username already exists" });
    }
    res.status(500).json({ message: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, user: { id: user._id, username, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//GET ALL USERS
exports.GetAllUser = async (req, res) => {
  try {
    const userList = await User.find();
    res.json(userList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user with the new information
    user.username = req.body.username || user.username;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.deleteOne();
    return res.json({ message: "User deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//LOGOUT LOGIC
exports.userLogout = (req, res) => {
  // Clear the token or any session information
  res.clearCookie("token");
  return res.status(200).json({
    message: "You have been logged out successfully.",
    success: true,
  });
};
