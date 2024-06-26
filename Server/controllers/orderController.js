// controllers/orderController.js
const { Order, orderItemSchema } = require('../models/OrderSchema');
const { ORDER_CATEGORIES, ROLES } = require('../constants/Constants');

exports.createOrder = async (req, res) => {
  try {
    const { table, items } = req.body;
    const order = new Order({ table, items });

    // Categorize the order items and assign to appropriate roles
    order.items = items.map(item => {
      let assignedTo;
      if (ORDER_CATEGORIES.hotDrinks.includes(item.item)) {
        assignedTo = ROLES.barista;
      } else if (ORDER_CATEGORIES.desserts.includes(item.item)) {
        assignedTo = ROLES.desserts;
      } else if (ORDER_CATEGORIES.foodItems.includes(item.item)) {
        assignedTo = ROLES.kitchen;
      } else {
        assignedTo = ROLES.waiter;
      }
      return { item: item.item, quantity: item.quantity, price: item.price, assignedTo };
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getBaristaDrinks = async (req, res) => {
  try {
    const orders = await Order.find({
      'items.assignedTo': ROLES.barista
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getKitchenOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      'items.assignedTo': ROLES.kitchen
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDessertOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      'items.assignedTo': ROLES.desserts
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};