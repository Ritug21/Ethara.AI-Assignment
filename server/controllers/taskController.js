const Task = require("../models/Task");

const User = require("../models/User");

const user = await User.findById(assignedTo);

if (!user) {
  return res.status(404).json({ msg: "Assigned user not found" });
}
// Create Task
exports.createTask = async (req, res) => {
  try {
    // 🔥 ROLE CHECK
    if (req.user.role !== "Admin") {
      return res.status(403).json({ msg: "Only Admin can create tasks" });
    }

    const { title, description, projectId, assignedTo } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const task = new Task({
      title,
      description,
      projectId,
      assignedTo
    });

    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get Tasks
exports.getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "Admin") {
      // Admin → see all tasks
      tasks = await Task.find()
        .populate("assignedTo", "name email role")
        .populate("projectId", "name")
        .sort({ createdAt: -1 }); // newest first
    } else {
      // Member → only assigned tasks
      tasks = await Task.find({ assignedTo: req.user.id })
        .populate("assignedTo", "name email role")
        .populate("projectId", "name")
        .sort({ createdAt: -1 });
    }

    res.json(tasks);
  } catch (err) {
    console.error(err); // useful for debugging
    res.status(500).json({ msg: "Server error" });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // Member can update only their own tasks
    if (
      req.user.role === "Member" &&
      task.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    task.status = req.body.status || task.status;

    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};