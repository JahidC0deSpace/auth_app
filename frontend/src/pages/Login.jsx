import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";
import styles from "./Login.module.css"; // 1. Import styles

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/login", credentials);
      login(res.data);
      toast.success(`Welcome back, ${res.data.user.username}!`);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.brandContent}>
          <h1 className={styles.brandTitle}>MyDashboard</h1>
          <p className={styles.brandText}>
            Manage your profile, track your statistics, and stay connected.
          </p>
          <div className={styles.features}>
            <div className={styles.feature}>✓ Secure Authentication</div>
            <div className={styles.feature}>✓ Real-time Updates</div>
            <div className={styles.feature}>✓ Easy Profile Management</div>
          </div>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <form onSubmit={handleLogin} className={styles.form}>
          <h2 className={styles.title}>Welcome Back</h2>
          <p className={styles.subtitle}>Please sign in to your account</p>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Email Address</label>
            <input
              type="email"
              className={styles.input}
              placeholder="name@company.com"
              required
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              className={styles.input}
              placeholder="••••••••"
              required
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>

          <button type="submit" className={styles.button}>
            Sign In
          </button>

          <p className={styles.footerText}>
            New user?{" "}
            <Link to="/register" className={styles.link}>
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
