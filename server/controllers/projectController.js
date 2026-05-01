const Project = require("../models/Project");

// Create Project (Admin)
exports.createProject = async (req, res) => {
  try {
    const { name } = req.body;

    const project = await Project.create({
      name,
      createdBy: req.user.id,
      members: [req.user.id]
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Projects
exports.getProjects = async (req, res) => {
  try {
    let projects;

    if (req.user.role === "Admin") {
      projects = await Project.find();
    } else {
      projects = await Project.find({
        members: req.user.id
      });
    }

    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};