const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  updateUserPassword,
  getUser,
  updateUser,
  adminGetAllUsers,
  adminGetUser,
  adminUpdateUser,
  adminDeleteUser,
} = require("../controllers/userController");
const { isAuth, authRoles } = require("../middlewares/auth");
const router = require("express").Router();

// === Auth APIs
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);
// ===============

// === Password Handler APIs
router.route("/password/reset").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/password/update").put(isAuth, updateUserPassword);
// ===============

// === Public APIs
router.route("/me").get(isAuth, getUser);

router.route("/me/update").put(isAuth, updateUser);
// ===============

// === Admin APIs
router.route("/admin/users").get(isAuth, authRoles("admin"), adminGetAllUsers);

router
  .route("/admin/user/:userId")
  .get(isAuth, authRoles("admin"), adminGetUser)
  .put(isAuth, authRoles("admin"), adminUpdateUser)
  .delete(isAuth, authRoles("admin"), adminDeleteUser);
// ===============

module.exports = router;
