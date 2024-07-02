const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['Vacant', 'Occupied'],
    default: 'Vacant',
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
});

module.exports = mongoose.model('Table', tableSchema);