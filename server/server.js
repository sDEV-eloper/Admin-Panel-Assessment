const express = require('express');
const dotenv=require('dotenv')
const bodyParser=require('body-parser')
const cors=require('cors')
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());


app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);


const PORT = process.env.PORT || 3001;
// MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));

