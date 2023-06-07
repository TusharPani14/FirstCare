const express = require("express");
const {
  createUser,
  authUser,
  getUsers,
  updateUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/createUser").post(protect, createUser);
router.route("/updateUser").put(protect, updateUser);
router.route("/getUsers").get(protect, getUsers);
router.route("/login").post(authUser);

module.exports = router;
