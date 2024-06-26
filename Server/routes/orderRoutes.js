// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { auth, authorize } = require('../middlewares/auth');
const { ROLES } = require('../constants/Constants');

// Create an order without authentication
router.post('/orders', orderController.createOrder);

// All other order-related routes require authentication and authorization
router.get('/orders', auth, orderController.getAllOrders);
router.get('/orders/:id', auth, orderController.getOrderById);
router.put('/orders/:id', auth, orderController.updateOrder);

router.get('/orders/waiter', auth, authorize(ROLES.waiter), orderController.getWaiterOrders);
router.get('/orders/barista', auth, authorize(ROLES.barista), orderController.getBaristaDrinks);
router.get('/orders/kitchen', auth, authorize(ROLES.kitchen), orderController.getKitchenOrders);
router.get('/orders/desserts', auth, authorize(ROLES.desserts), orderController.getDessertOrders);
router.get('/orders/cashier', auth, authorize(ROLES.cashier), orderController.getCashierOrders);

module.exports = router;