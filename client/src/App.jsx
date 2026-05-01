import { useState } from "react";

const API = "http://localhost:5000"; // 🔥 change after deploy

const cardStyle = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  color: "white"
};

const taskStyle = {
  background: "#1e293b",
  padding: "15px",
  borderRadius: "8px",
  marginBottom: "10px",
  display: "flex",
  justifyContent: "space-between",
  color: "white"
};

function App() {
  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");
  const [role, setRole] = useState("Member");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [dashboard, setDashboard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔐 LOGIN
  const handleLogin = async () => {
    const res = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      fetchDashboard();
      fetchTasks();
      fetchProjects();
    } else {
      alert("Login failed");
    }
  };

  // 🆕 SIGNUP
  const handleSignup = async () => {
    const res = await fetch(`${API}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password, role })
    });

    const data = await res.json();

    if (data._id) {
      alert("Signup successful! Please login.");
      setIsSignup(false);
    } else {
      alert(data.error || "Signup failed");
    }
  };

  // 📊 DASHBOARD
  const fetchDashboard = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/api/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    setDashboard(data);
  };

  // 📋 TASKS
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/api/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    setTasks(data);
  };

  // 📁 PROJECTS
  const fetchProjects = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/api/projects`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    setProjects(data);

    if (data.length > 0) {
      setSelectedProject(data[0]._id);
    }
  };

  // ➕ CREATE TASK
  const createTask = async () => {
    const token = localStorage.getItem("token");

    if (!title) return alert("Enter task title");

    await fetch(`${API}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        description: "New Task",
        projectId: selectedProject,
        assignedTo: user._id
      })
    });

    setTitle("");
    fetchTasks();
    fetchDashboard();
  };

  // 🔄 UPDATE STATUS
  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");

    await fetch(`${API}/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });

    fetchTasks();
    fetchDashboard();
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Team Task Manager</h1>

      {/* USER INFO */}
      {user && (
        <>
          <p style={{ color: "#aaa" }}>
            Logged in as: {user.name} ({user.role})
          </p>
          <button onClick={logout}>Logout</button>
        </>
      )}

      {/* AUTH */}
      {!dashboard && (
        <>
          {isSignup && (
            <>
              <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
              <br /><br />

              <select onChange={(e) => setRole(e.target.value)}>
                <option value="Member">Member</option>
                <option value="Admin">Admin</option>
              </select>
              <br /><br />
            </>
          )}

          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <br /><br />

          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /><br />

          {isSignup ? (
            <button onClick={handleSignup}>Signup</button>
          ) : (
            <button onClick={handleLogin}>Login</button>
          )}

          <br /><br />

          <button onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Go to Login" : "Create Account"}
          </button>
        </>
      )}

      {/* DASHBOARD */}
      {dashboard && (
        <>
          <h2>Dashboard</h2>
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={cardStyle}>Total: {dashboard.total}</div>
            <div style={cardStyle}>Done: {dashboard.completed}</div>
            <div style={cardStyle}>Pending: {dashboard.pending}</div>
            <div style={cardStyle}>Overdue: {dashboard.overdue}</div>
          </div>

          <h2>Tasks</h2>

          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>

          <br /><br />

          <input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {user?.role === "Admin" && (
            <button onClick={createTask}>Add Task</button>
          )}

          {/* EMPTY STATE */}
          {tasks.length === 0 && <p>No tasks yet</p>}

          {/* TASK LIST */}
          {tasks.map((t) => (
            <div key={t._id} style={taskStyle}>
              <div>
                <strong>{t.title}</strong>
                <p>{t.status}</p>

                <p style={{ fontSize: "12px", color: "#aaa" }}>
                  Assigned to: {t.assignedTo?.name}
                </p>

                <p style={{ fontSize: "12px", color: "#aaa" }}>
                  Project: {t.projectId?.name}
                </p>
              </div>

              <div>
                <button onClick={() => updateStatus(t._id, "In Progress")}>
                  In Progress
                </button>
                <button onClick={() => updateStatus(t._id, "Done")}>
                  Done
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;