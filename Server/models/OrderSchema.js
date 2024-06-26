// models/order.js
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  table: { type: Number, required: true },
  items: [orderItemSchema],
  status: {
    type: String,
    enum: ['received', 'processing', 'ready', 'delivered'],
    default: 'received'
  },
  assignedTo: {
    type: String,
    enum: ['waiter', 'barista', 'kitchen', 'desserts', 'cashier'],
    required: true
  },
  timestamp: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = { Order, orderItemSchema };