
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModels = require('../models/user.models');

// Register User
const registerUser = async (req, res) => {
  const { username, email, dateOfBirth, role, location, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if email or username already exists
    const existingUser = await userModels.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new userModels({ username, email, dateOfBirth, role, location, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error.message); // Log error for debugging
    res.status(500).json({ message: "An error occurred while registering the user", error: error.message });
  }
};


// Login User
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModels.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, username: user.username, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Users (Admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await userModels.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get User by ID (Admin only)
const getUserById = async (req, res) => {
  try {
    const user = await userModels.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update User (Admin only)
const updateUser = async (req, res) => {
  try {
    const updatedUser = await userModels.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete User (Admin only)
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userModels.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}