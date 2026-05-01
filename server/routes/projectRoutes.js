const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createProject,
  getProjects
} = require("../controllers/projectController");

// Admin only
router.post("/", auth, role("Admin"), createProject);

// All users
router.get("/", auth, getProjects);

module.exports = router;