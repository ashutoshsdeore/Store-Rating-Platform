const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const roleMiddleware =
require("../middleware/roleMiddleware");

const {
  addStore,
  getStores
} = require("../controllers/storeController");

// Admin Only
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  addStore
);

// Logged In Users
router.get(
  "/",
  authMiddleware,
  getStores
);

module.exports = router;