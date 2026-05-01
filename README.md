🚀 Team Task Manager (Full-Stack)

A full-stack web application where users can create projects, assign tasks, and track progress with role-based access (Admin / Member).

🌟 Features

🔐 Authentication

User Signup & Login (JWT-based) Role selection (Admin / Member) 👥 Role-Based Access Control Admin Create projects Create & assign tasks View all tasks Member View assigned tasks only Update task status 📁 Project Management Create projects Assign members (basic) Select project while creating tasks 📋 Task Management Create tasks Assign tasks to users Update task status (Todo → In Progress → Done) 📊 Dashboard Total tasks Completed tasks Pending tasks Overdue tasks 🛠️ Tech Stack Frontend React.js Fetch API Inline CSS Backend Node.js Express.js MongoDB (Mongoose) Authentication JWT (jsonwebtoken) bcrypt.js (password hashing) 🌐 Live Demo Frontend: https://your-frontend.vercel.app Backend: https://your-backend.up.railway.app

(Replace with your actual deployed links)

⚙️ Setup Instructions 1️⃣ Clone Repository git clone https://github.com/YOUR_USERNAME/team-task-manager.git cd team-task-manager 2️⃣ Backend Setup cd server npm install

Create .env file:

MONGO_URI=your_mongodb_connection_string JWT_SECRET=your_secret_key PORT=5000

Run backend:

npm run dev

or
node server.js 3️⃣ Frontend Setup cd client npm install npm start 🔗 API Endpoints 🔐 Auth POST /api/auth/signup POST /api/auth/login 📁 Projects GET /api/projects POST /api/projects (Admin only) 📋 Tasks GET /api/tasks POST /api/tasks (Admin only) PUT /api/tasks/:id 📊 Dashboard GET /api/dashboard 🔒 Role-Based Logic Middleware checks JWT token Role-based access enforced in backend UI also adapts based on user role 📸 Screenshots

(Add screenshots here if possible)

🎥 Demo Video

📹 Link: (Add your demo video link here)

🚀 Deployment Backend deployed on Railway Frontend deployed on Vercel 📌 Future Improvements Add team member management UI Add due date filters Improve UI with component-based design Add notifications 👨‍💻 Author

Ritu Agrahari GitHub: https://github.com/Ritug21/Ethara.AI-Assignment

⭐ Conclusion

This project demonstrates:

Full-stack development REST API design Role-based authentication Real-world task management system

✨ Built for assignment submission and real-world application practice
