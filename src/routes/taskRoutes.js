const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/tasks", createTask);
router.get("/tasks", getTasks);
router.put("/tasks/:taskId", updateTask);
router.delete("/tasks/:taskId", deleteTask);

module.exports = router;
