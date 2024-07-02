const Order = require("../models/OrderSchema");
const Table = require("../models/TableSchema");
const { ORDER_CATEGORIES, ROLES } = require("../constants/Constants");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("table")
      .populate("items.category");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { table, items } = req.body;
    const tableDoc = await Table.findById(table);

    const order = {
      items: await Promise.all(
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
          return {
            item: item.item,
            quantity: item.quantity,
            price: item.price,
            assignedTo,
            status: "pending",
          };
        })
      ),
      createdBy: req.user.id,
      status: "pending",
    };

    tableDoc.orders.push(order);
    await tableDoc.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateOrderItem = async (req, res) => {
  const { tableId, orderId, itemId } = req.params;
  const { status } = req.body;

  try {
    const table = await Table.findById(tableId);
    const order = table.orders.id(orderId);
    const item = order.items.id(itemId);

    if (order.items.some((i) => i.status === "done")) {
      return res
        .status(400)
        .json({ message: "Only one item can be updated at a time" });
    }

    item.status = status;
    await table.save();
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getTableOrders = async (req, res) => {
  try {
    const table = await Table.findById(req.params.tableId).populate("orders");
    res.json(table.orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getWaiterOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      createdBy: req.user.id,
      status: { $ne: "completed" },
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBaristaDrinks = async (req, res) => {
  try {
    const orders = await Order.find({
      "items.assignedTo": ROLES.barista,
      "items.status": { $ne: "done" },
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getKitchenOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      "items.assignedTo": ROLES.kitchen,
      "items.status": { $ne: "done" },
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDessertOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      "items.assignedTo": ROLES.desserts,
      "items.status": { $ne: "done" },
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  const { tableId, orderId } = req.params;

  try {
    const table = await Table.findById(tableId);
    const orderIndex = table.orders.findIndex((order) => order._id.toString() === orderId);

    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const order = table.orders[orderIndex];

    // Check if all items in the order have a status of "done"
    if (order.items.every((item) => item.status === 'done')) {
      table.orders.splice(orderIndex, 1);
      await table.save();
      res.json({ message: 'Order deleted' });
    } else {
      res.status(400).json({ message: 'Cannot delete an order with items not in "done" status' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCashierOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "completed" });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrderStats = async (req, res) => {
  try {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);

    const orders = await Order.find({
      createdAt: { $gte: startDate, $lte: endDate },
    }).populate("items.category");

    const totalRevenue = orders.reduce((total, order) => {
      return (
        total +
        order.items.reduce((itemTotal, item) => {
          return itemTotal + item.quantity * item.price;
        }, 0)
      );
    }, 0);

    const itemStats = orders.reduce((stats, order) => {
      order.items.forEach((item) => {
        const existingItem = stats.find((i) => i.item === item.item);
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          stats.push({
            item: item.item,
            category: item.category.name,
            quantity: item.quantity,
          });
        }
      });
      return stats;
    }, []);

    itemStats.sort((a, b) => b.quantity - a.quantity);

    const busyTimes = orders.reduce((stats, order) => {
      const hour = order.createdAt.getHours();
      stats[hour] = (stats[hour] || 0) + 1;
      return stats;
    }, []);

    res.json({
      totalRevenue,
      mostPopularItems: itemStats.slice(0, 5),
      busyTimes,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const { tableId, userId } = req.query;
    let query = {};

    if (tableId) {
      const table = await Table.findById(tableId);
      if (!table) {
        return res.status(404).json({ message: "Table not found" });
      }
      query = { _id: { $in: table.orders.map((o) => o._id) } };
    } else if (userId) {
      query = { createdBy: userId };
    } else {
      return res
        .status(400)
        .json({ message: "Either tableId or userId must be provided" });
    }

    const orders = await Order.find(query)
      .populate("table")
      .populate("items.category");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTableStatus = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    res.json({ status: table.status });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
