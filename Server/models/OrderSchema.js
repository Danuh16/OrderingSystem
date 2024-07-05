const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  items: [
    {
      item: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      assignedTo: { type: String, required: true, enum: ['waiter', 'kitchen', 'barista', 'desserts'] },
      status: { type: String, required: true, enum: ['pending', 'in progress', 'done'] },
    },
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, required: true, enum: ['pending', 'in progress', 'completed'] },
});

module.exports = mongoose.model("Order", OrderSchema);