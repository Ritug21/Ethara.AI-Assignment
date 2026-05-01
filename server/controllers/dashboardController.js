const Task = require("../models/Task");

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const total = await Task.countDocuments({ assignedTo: userId });

    const completed = await Task.countDocuments({
      assignedTo: userId,
      status: "Done"
    });

    const pending = await Task.countDocuments({
      assignedTo: userId,
      status: "Todo"
    });

    const overdue = await Task.countDocuments({
      assignedTo: userId,
      deadline: { $lt: new Date() },
      status: { $ne: "Done" }
    });

    res.json({
      total,
      completed,
      pending,
      overdue
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};