const { Order } = require('../models/OrderSchema');
const { ORDER_CATEGORIES, ROLES } = require('../constants/Constants');

exports.createOrder = async (req, res) => {
  try {
    const { table, items } = req.body;
    const order = new Order({ table });

    // Categorize the order items and assign to appropriate roles
    order.items = await Promise.all(
      items.map(async (item) => {
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
      })
    );

    // Set the order-level assignedTo field
    order.assignedTo = order.items.reduce((prevRole, orderItem) => {
      if (orderItem.assignedTo === ROLES.kitchen) return ROLES.kitchen;
      if (orderItem.assignedTo === ROLES.barista) return ROLES.barista;
      if (orderItem.assignedTo === ROLES.desserts) return ROLES.desserts;
      return ROLES.waiter;
    }, ROLES.waiter);

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { table, items } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.table = table;
    order.items = items;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getWaiterOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      'items.assignedTo': ROLES.waiter
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
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

exports.getCashierOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      'items.assignedTo': ROLES.cashier
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
