const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  username: {
    type: String,
    required: [true, 'username is required'],
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