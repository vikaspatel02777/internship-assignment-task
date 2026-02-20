# 🚀 Task Manager - Full Stack Application

A professional task management application built with React, Node.js, Express, MongoDB, and JWT authentication.

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT token-based authentication
- Protected routes with middleware
- Secure password hashing with bcrypt

### 📝 Task Management
- Create, Read, Update, Delete tasks
- User-specific task filtering
- Task completion toggle
- Real-time search functionality
- Professional UI/UX

### 🛠️ Technical Stack
- **Frontend:** React 18 + Vite + Tailwind CSS
- **Backend:** Node.js + Express + MongoDB
- **Authentication:** JWT with bcrypt
- **Architecture:** RESTful API with protected routes

### 🎯 Production Features
- Scalable API service with interceptors
- Professional UI/UX with Tailwind
- Error handling and loading states
- Clean component architecture
- Security best practices

## 📁 Project Structure

```
frontend-developer-task/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── taskController.js    # Task CRUD operations
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT verification
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Task.js            # Task schema
│   ├── routes/
│   │   ├── authRoutes.js       # Auth endpoints
│   │   └── taskRoutes.js       # Task endpoints
│   ├── .env                   # Environment variables
│   ├── package.json
│   └── server.js              # Express server
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx       # Navigation component
    │   │   └── ProtectedRoute.jsx # Route protection
    │   ├── pages/
    │   │   ├── Dashboard.jsx    # Main task interface
    │   │   ├── Login.jsx       # Login page
    │   │   └── Register.jsx    # Registration page
    │   ├── services/
    │   │   └── api.js         # API service with interceptors
    │   ├── App.jsx             # Main app component
    │   └── main.jsx           # React entry point
    ├── package.json
    ├── tailwind.config.js      # Tailwind configuration
    ├── postcss.config.js       # PostCSS configuration
    └── index.css              # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vikaspatel02777/internship-assignment-task.git
   cd internship-assignment-task
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**
   ```bash
   # Create .env file
   cp .env.example .env
   
   # Add your variables
   MONGO_URI=mongodb://localhost:27017/taskmanager
   JWT_SECRET=your-super-secret-jwt-key
   PORT=5000
   ```

4. **Start Backend**
   ```bash
   node server.js
   ```

5. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

6. **Start Frontend**
   ```bash
   npm run dev
   ```

7. **Access Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📖 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Tasks
- `GET /api/tasks` - Get user's tasks (protected)
- `POST /api/tasks` - Create new task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

## 🎨 Features Demonstration

### Authentication Flow
1. User registers with email and password
2. Password is hashed with bcrypt
3. JWT token is generated and stored
4. Token is used for protected routes

### Task Management
1. Users can create, read, update, delete tasks
2. Tasks are filtered by user ID
3. Real-time search functionality
4. Task completion toggle
5. Professional UI with loading states

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Protected routes middleware
- CORS configuration
- Input validation
- Error handling

## 🚀 Deployment

### Quick Deploy
```bash
# Frontend to Vercel
cd frontend
vercel --prod

# Backend to Render
# Connect GitHub repo to Render
# Set environment variables
```

### Environment Variables
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
```

## 📊 Live Demo

[🚀 Deployed Application](https://your-app-url.com)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🎯 Project Highlights

### Technical Excellence
- ✅ Production-ready architecture
- ✅ Security best practices
- ✅ Professional UI/UX
- ✅ Scalable codebase
- ✅ Clean separation of concerns

### Modern Development Practices
- ✅ RESTful API design
- ✅ JWT authentication
- ✅ Component-based architecture
- ✅ Tailwind CSS for styling
- ✅ Error handling and loading states

### Internship-Ready Features
- ✅ Full CRUD operations
- ✅ User authentication
- ✅ Protected routes
- ✅ Search functionality
- ✅ Professional documentation
- ✅ Deployment guide

---

**🎉 Perfect for internship submission and production deployment!**

Built with ❤️ using React, Node.js, Express, MongoDB, and Tailwind CSS
