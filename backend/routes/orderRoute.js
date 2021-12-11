const {
  createOrder,
  getMyOrders,
  getOrder,
  adminGetAllOrders,
  adminUpdateOrder,
  adminDeleteOrder,
  adminGetOrderByUser,
} = require("../controllers/orderController");
const { isAuth, authRoles } = require("../middlewares/auth");
const router = require("express").Router();

// === Public APIs
router.route("/order/add").post(isAuth, createOrder);

router.route("/orders/me").get(isAuth, getMyOrders);

router.route("/order/:orderId").get(isAuth, getOrder);
// ===============

// === Admin APIs
router.route("/admin/orders").get(isAuth, authRoles("admin"), adminGetAllOrders);

router
  .route("/admin/order/:orderId")
  .put(isAuth, authRoles("admin"), adminUpdateOrder)
  .delete(isAuth, authRoles("admin"), adminDeleteOrder);

router
  .route("/admin/order/user/:userId")
  .get(isAuth, authRoles("admin"), adminGetOrderByUser);
// ===============

module.exports = router;
