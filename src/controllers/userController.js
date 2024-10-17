const User = require('../models/User');
   const bcrypt = require('bcryptjs');
   const jwt = require('jsonwebtoken');

   // Регистрация пользователя
   exports.registerUser = async (req, res) => {
       const { username, password, email } = req.body;
       try {
           const hashedPassword = await bcrypt.hash(password, 10);
           const newUser = new User({ username, password: hashedPassword, email });
           await newUser.save();
           res.status(201).json({ message: 'User registered' });
       } catch (error) {
           res.status(500).json({ message: 'Error registering user' });
       }
   };

   // Аутентификация пользователя
   exports.loginUser = async (req, res) => {
       const { username, password } = req.body;
       try {
           const user = await User.findOne({ username });
           if (!user || !(await bcrypt.compare(password, user.password))) {
               return res.status(401).json({ message: 'Invalid credentials' });
           }
           const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
           res.json({ token });
       } catch (error) {
           res.status(500).json({ message: 'Error logging in' });
       }
   };