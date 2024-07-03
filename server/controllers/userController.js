const User = require('../models/userModel');
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken');

// User registration
exports.register = async (req, res, next) => {

  const { firstName, lastName, email, password, role } = req.body;
 const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({ firstName, lastName, email, password: hashedPassword, role });
  try {
    const existingEmail = await User.findOne({ email });  
    if (existingEmail) {
      return res.status(400).json({error:"email already exists"});
    }
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

// User login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "user not found "));
    const validPassword = bcrypt.compareSync(password, validUser.password);

    if (validPassword) {
      const token = jwt.sign({ _id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = validUser._doc;
      //save token inside cookie
      res
        .cookie(" access_token", token, {  httpOnly: true,
          expires: new Date(Date.now() + 100 * 30),
          maxAge: 1000 * 60 * 60 * 24 * 7, })
        .status(200)
        .json(rest);
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (err) {
    next(err);
  }
};

// User logout
exports.logout = (req, res) => {
  res.json({ message: 'User logged out successfully' });
};
