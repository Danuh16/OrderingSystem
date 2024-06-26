const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoute');

require("dotenv/config");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*", // Replace with allowed origin
  optionsSuccessStatus: 200,
};



const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URL;

// Connect to MongoDB
mongoose.connect(mongoURI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});