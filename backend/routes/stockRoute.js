const express = require("express");
const {
  createStocks,
  getStocks,
  updateStocks,
  deleteStocks,
} = require("../controllers/stockController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/create").post(protect, createStocks);
router.route("/get").get(protect, getStocks);
router.route("/update").put(protect, updateStocks);
router.route("/delete").post(protect, deleteStocks);

module.exports = router;
