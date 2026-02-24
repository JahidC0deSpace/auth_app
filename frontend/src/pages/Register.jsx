import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";
import styles from "./Register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>Create Account</h2>
          <p className={styles.subtitle}>
            Join us today! It only takes a minute.
          </p>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Username</label>
            <input
              type="text"
              placeholder="e.g. john_doe"
              required
              className={styles.input}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              required
              className={styles.input}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              className={styles.input}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p className={styles.footerText}>
            Already have an account?{" "}
            <Link to="/login" className={styles.link}>
              Login
            </Link>
          </p>
        </form>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.brandContent}>
          <h1 className={styles.brandTitle}>Join MyDashboard</h1>
          <p className={styles.brandText}>
            Create your account and start managing your profile with our
            powerful dashboard.
          </p>
          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <div className={styles.statNumber}>10K+</div>
              <div className={styles.statLabel}>Active Users</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statNumber}>99%</div>
              <div className={styles.statLabel}>Uptime</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statNumber}>24/7</div>
              <div className={styles.statLabel}>Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
