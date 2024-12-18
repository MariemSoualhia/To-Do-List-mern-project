const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  changeStatus,
  updateTaskStatus,
} = require("../controllers/taskController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(auth, getTasks).post(auth, createTask);
router.route("/:id").put(auth, updateTask).delete(auth, deleteTask);
router.route("/:id/changestatus").patch(auth, changeStatus);
router.put("/:id/status", auth, updateTaskStatus);

module.exports = router;
