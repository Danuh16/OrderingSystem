const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName:{
    type: String,
    required: true
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['waiter', 'barista', 'kitchen', 'cashier'],
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;