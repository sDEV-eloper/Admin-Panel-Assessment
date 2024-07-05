const User = require('../models/userModel');
const bcrypt= require('bcryptjs')

// Create new user
exports.createUser = async (req, res) => {

    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ firstName, lastName, email, password:hashedPassword });
  try {
    const existingEmail = await User.findOne({ email });  
    if (existingEmail) {
      return res.status(400).json({error:"email already exists"});
    }
    await user.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

// Get list of users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update user details
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    await User.findByIdAndUpdate(id, { firstName, lastName, email });
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };