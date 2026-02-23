import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
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
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <div style={styles.brandContent}>
          <h1 style={styles.brandTitle}>MyDashboard</h1>
          <p style={styles.brandText}>
            Manage your profile, track your statistics, and stay connected with
            your dashboard.
          </p>
          <div style={styles.features}>
            <div style={styles.feature}>✓ Secure Authentication</div>
            <div style={styles.feature}>✓ Real-time Updates</div>
            <div style={styles.feature}>✓ Easy Profile Management</div>
          </div>
        </div>
      </div>

      <div style={styles.rightPanel}>
        <form onSubmit={handleLogin} style={styles.form}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Please sign in to your account</p>

          {error && <p style={styles.error}>{error}</p>}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              required
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) =>
              (e.target.style.transform = "translateY(-2px)")
            }
            onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
          >
            Sign In
          </button>

          <p style={styles.footerText}>
            New user?{" "}
            <Link to="/register" style={styles.link}>
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  leftPanel: {
    flex: 1,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },
  brandContent: {
    color: "white",
    maxWidth: "400px",
  },
  brandTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "20px",
  },
  brandText: {
    fontSize: "1.1rem",
    opacity: "0.9",
    lineHeight: "1.7",
    marginBottom: "30px",
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  feature: {
    fontSize: "1rem",
    opacity: "0.85",
  },
  rightPanel: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    background: "#f8fafc",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    background: "white",
    padding: "50px 40px",
    borderRadius: "20px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: "8px",
    textAlign: "center",
  },
  subtitle: {
    color: "#6b7280",
    textAlign: "center",
    marginBottom: "35px",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "2px solid #e5e7eb",
    fontSize: "15px",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
  },
  button: {
    width: "100%",
    padding: "15px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
  },
  error: {
    color: "#dc2626",
    fontSize: "0.9rem",
    marginBottom: "15px",
    textAlign: "center",
    background: "#fef2f2",
    padding: "10px",
    borderRadius: "8px",
  },
  footerText: {
    marginTop: "25px",
    textAlign: "center",
    color: "#6b7280",
    fontSize: "14px",
  },
  link: {
    color: "#667eea",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default Login;
