const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const roleMiddleware =
require("../middleware/roleMiddleware");

const {
  submitRating,
  updateRating
} = require("../controllers/ratingController");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("USER"),
  submitRating
);

router.put(
  "/",
  authMiddleware,
  roleMiddleware("USER"),
  updateRating
);

module.exports = router;