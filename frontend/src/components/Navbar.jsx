import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        <span style={styles.logoIcon}>◆</span> MyDashboard
      </Link>

      <div style={styles.links}>
        <Link
          to="/"
          style={styles.link}
          onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
          onMouseLeave={(e) => (e.target.style.color = "#cbd5e1")}
        >
          Home
        </Link>
        <Link
          to="/profile"
          style={styles.link}
          onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
          onMouseLeave={(e) => (e.target.style.color = "#cbd5e1")}
        >
          Profile
        </Link>

        <div style={styles.userSection}>
          <div style={styles.userAvatar}>
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <button
            onClick={logout}
            style={styles.logoutBtn}
            onMouseEnter={(e) => {
              e.target.style.background = "#dc2626";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(239, 68, 68, 0.9)";
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 40px",
    background: "linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%)",
    color: "white",
    alignItems: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  },
  logo: {
    fontSize: "1.4rem",
    fontWeight: "700",
    textDecoration: "none",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoIcon: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "1.6rem",
  },
  links: {
    display: "flex",
    gap: "30px",
    alignItems: "center",
  },
  link: {
    color: "#cbd5e1",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "0.95rem",
    transition: "color 0.2s",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginLeft: "20px",
    paddingLeft: "25px",
    borderLeft: "1px solid rgba(255,255,255,0.15)",
  },
  userAvatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    fontWeight: "600",
    color: "white",
  },
  logoutBtn: {
    background: "rgba(239, 68, 68, 0.9)",
    border: "none",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.9rem",
    transition: "background 0.2s",
  },
};

export default Navbar;
