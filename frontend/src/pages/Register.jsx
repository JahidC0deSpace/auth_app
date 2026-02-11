import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/user/register", formData);
      toast.success(res.data.message || "Registration successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join us today! It only takes a minute.</p>

          {error && <div style={styles.errorBox}>{error}</div>}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              placeholder="e.g. john_doe"
              required
              style={styles.input}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              required
              style={styles.input}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              style={styles.input}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={loading ? styles.buttonDisabled : styles.button}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p style={styles.footerText}>
            Already have an account?{" "}
            <Link to="/login" style={styles.link}>
              Login
            </Link>
          </p>
        </form>
      </div>

      <div style={styles.rightPanel}>
        <div style={styles.brandContent}>
          <h1 style={styles.brandTitle}>Join MyDashboard</h1>
          <p style={styles.brandText}>
            Create your account and start managing your profile with our
            powerful dashboard.
          </p>
          <div style={styles.statsGrid}>
            <div style={styles.statBox}>
              <div style={styles.statNumber}>10K+</div>
              <div style={styles.statLabel}>Active Users</div>
            </div>
            <div style={styles.statBox}>
              <div style={styles.statNumber}>99%</div>
              <div style={styles.statLabel}>Uptime</div>
            </div>
            <div style={styles.statBox}>
              <div style={styles.statNumber}>24/7</div>
              <div style={styles.statLabel}>Support</div>
            </div>
          </div>
        </div>
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    background: "#f8fafc",
  },
  rightPanel: {
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
    textAlign: "center",
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
    marginBottom: "40px",
  },
  statsGrid: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
  },
  statBox: {
    background: "rgba(255,255,255,0.15)",
    padding: "20px 25px",
    borderRadius: "12px",
    backdropFilter: "blur(10px)",
  },
  statNumber: {
    fontSize: "1.5rem",
    fontWeight: "700",
  },
  statLabel: {
    fontSize: "0.85rem",
    opacity: "0.8",
  },
  form: {
    width: "100%",
    maxWidth: "420px",
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
    marginBottom: "30px",
    fontSize: "14px",
    textAlign: "center",
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
    transition: "border-color 0.3s",
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
  buttonDisabled: {
    width: "100%",
    padding: "15px",
    background: "#c4b5fd",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    cursor: "not-allowed",
    marginTop: "10px",
  },
  errorBox: {
    backgroundColor: "#fef2f2",
    color: "#dc2626",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "20px",
    fontSize: "14px",
    border: "1px solid #fecaca",
  },
  footerText: {
    marginTop: "25px",
    fontSize: "14px",
    color: "#6b7280",
    textAlign: "center",
  },
  link: {
    color: "#667eea",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default Register;
