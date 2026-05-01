const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

dotenv.config();

// ✅ FIRST create app
const app = express();

// ✅ THEN middleware
app.use(cors());
app.use(express.json());

// ✅ THEN routes import
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

// ✅ THEN use routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});