const express = require("express");
const { authUser } = require("../controllers/userController");

const router = express.Router();


router.route("/login").post(authUser)

module.exports = router;
