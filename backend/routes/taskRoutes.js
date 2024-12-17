const express = require("express");
const { getTasks, createTask } = require("../controllers/taskController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(auth, getTasks).post(auth, createTask);

module.exports = router;
