const {
  getAllProducts,
  getProduct,
  adminGetAllProducts,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
} = require("../controllers/productController");
const { isAuth, authRoles } = require("../middlewares/auth");
const router = require("express").Router();

// === Public APIs
router.route("/products").get(getAllProducts);

router.route("/product/:productId").get(getProduct);
// ===============

// === Admin APIs
router.route("/admin/products").get(adminGetAllProducts);

router.route("/admin/product/add").post(isAuth, authRoles("admin"), adminCreateProduct);

router
  .route("/admin/product/:productId")
  .put(isAuth, adminUpdateProduct)
  .delete(isAuth, authRoles("admin"), adminDeleteProduct);
// ===============

module.exports = router;
