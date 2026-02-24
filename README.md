# 🚀 MyDashboard - Full-Stack React Application

A modern, responsive dashboard application featuring secure authentication, real-time profile management, and high-quality UI/UX transitions.

## ✨ Key Features

- **🔐 Secure Authentication**: Full Login and Registration flow with JWT-based sessions.
- **👤 Profile Management**: Dynamic user profiles with real-time bio and username updates.
- **🎨 Modular Styling**: Clean separation of concerns using **CSS Modules** for scoped, conflict-free styling.
- **🛡️ Protected Routes**: Authentication-guarded dashboard and profile pages.
- **📱 Responsive Design**: Optimized for various screen sizes with modern CSS layouts.

## 🛠️ Tech Stack

- **Frontend**: [React.js](https://react.dev)
- **Routing**: [React Router v6](https://reactrouter.com)
- **State Management**: React Context API
- **API Handling**: [Axios](https://axios-http.com)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com)
- **Backend**: Node.js / Express (connected via `api.js`)

## 📦 Project Structure

```text
src/
├── api/            # Axios instance and API configuration
├── components/     # Reusable UI components (Navbar, ProtectedRoute)
├── context/        # AuthContext for global user state
├── pages/          # Page components (Home, Login, Register, Profile)
│   ├── Login.js
│   ├── Login.module.css    # Scoped styles for Login
│   ├── Register.js
│   ├── Register.module.css # Scoped styles for Register
│   └── ...
└── App.js          # Main router with AnimatePresence transitions
```
