const express = require("express");
const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");

const {
  getDashboard,
  addUser,
  getUsers,
  getStores,
  getUserById
} = require("../controllers/adminController");

// Dashboard
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getDashboard
);

// Add User
router.post(
  "/users",
  authMiddleware,
  roleMiddleware("ADMIN"),
  addUser
);

// Get All Users + Filters
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getUsers
);

// Get Single User Details
router.get(
  "/users/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getUserById
);

// Get Stores with Ratings
router.get(
  "/stores",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getStores
);

module.exports = router;