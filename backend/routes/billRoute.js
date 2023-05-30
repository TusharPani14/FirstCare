const express = require("express");
const { createBills } = require("../controllers/billController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/create").post(protect,createBills)

module.exports = router;