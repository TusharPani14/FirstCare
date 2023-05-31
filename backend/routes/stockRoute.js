const express = require("express");
const {
  createStocks,
  getStocks,
  updateStocks,
  deleteStocks,
  getStockCP
} = require("../controllers/stockController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/create").post(protect, createStocks);
router.route("/get").get(protect, getStocks);
router.route("/update").put(protect, updateStocks);
router.route("/delete").post(protect, deleteStocks);
router.route("/getCP").post(protect, getStockCP);

module.exports = router;
