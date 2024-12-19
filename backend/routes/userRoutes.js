const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", auth, getUserProfile);
module.exports = router;
