const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { ROLES } = require("../constants/Constants");
const { auth, authorize } = require("../middlewares/auth");

router.post("/orders", authorize(ROLES.waiter), orderController.createOrder);
router.put(
  "/:tableId/:orderId/items/:itemId/status",
  authorize(ROLES.kitchen, ROLES.barista, ROLES.desserts),
  orderController.updateOrderItem
);
router.put(
  "/:tableId/:orderId/status",
  authorize(ROLES.waiter),
  orderController.updateOrderStatus
);
router.delete('/:tableId/:orderId', authorize(ROLES.waiter), orderController.deleteOrder);
router.get(
  "/:tableId/orders",
  authorize(ROLES.waiter, ROLES.cashier),
  orderController.getTableOrders
);
router.get("/", authorize(ROLES.cashier), orderController.getAllOrders);
router.get('/history', authorize(ROLES.waiter, ROLES.cashier), orderController.getOrderHistory);
router.get(
  "/assigned",
  authorize(ROLES.waiter),
  orderController.getWaiterOrders
);
router.get(
  "/barista",
  authorize(ROLES.barista),
  orderController.getBaristaDrinks
);
router.get(
  "/kitchen",
  authorize(ROLES.kitchen),
  orderController.getKitchenOrders
);
router.get(
  "/desserts",
  authorize(ROLES.desserts),
  orderController.getDessertOrders
);
router.get(
  "/cashier",
  authorize(ROLES.cashier),
  orderController.getCashierOrders
);

router.get('/tables/:id/status', authorize(ROLES.waiter, ROLES.cashier), orderController.getTableStatus);
router.get('/tables',auth, authorize(ROLES.waiter, ROLES.cashier), orderController.getAllTableData);
// router.post('/create/table', orderController.createTableData);
// router.put('/tables/:id/status', authorize(ROLES.waiter), orderController.updateTableStatus);

module.exports = router;
