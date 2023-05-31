const express = require("express");
const { createBills ,getBills} = require("../controllers/billController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/create").post(protect,createBills)
router.route("/get").get(protect,getBills)

module.exports = router;