const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks,
  updateTask
} = require("../controllers/taskController");

// 🔐 All routes require authentication
router.use(auth);

// 📌 Create Task (Admin only → handled inside controller)
router.post("/", createTask);

// 📌 Get Tasks (Admin → all, Member → only assigned → handled in controller)
router.get("/", getTasks);

// 📌 Update Task (status change allowed)
router.put("/:id", updateTask);

module.exports = router;