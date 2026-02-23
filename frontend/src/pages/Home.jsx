import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Welcome back, {user?.username}! 👋</h1>
        <p style={styles.subtitle}>
          You are successfully logged into your dashboard.
        </p>
      </div>

      <div style={styles.grid}>
        <div
          style={styles.card}
          onClick={() => navigate("/profile")}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow =
              "0 20px 40px rgba(102, 126, 234, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
          }}
        >
          <div style={styles.cardIcon}>👤</div>
          <h3 style={styles.cardTitle}>My Profile</h3>
          <p style={styles.cardText}>
            View and edit your personal information and bio.
          </p>
          <span style={styles.cardArrow}>→</span>
        </div>

        <div
          style={styles.card}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow =
              "0 20px 40px rgba(102, 126, 234, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
          }}
        >
          <div style={styles.cardIcon}>📊</div>
          <h3 style={styles.cardTitle}>Statistics</h3>
          <p style={styles.cardText}>
            Check your latest activity and app usage data.
          </p>
          <span style={styles.cardArrow}>→</span>
        </div>

        <div
          style={styles.card}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow =
              "0 20px 40px rgba(102, 126, 234, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
          }}
        >
          <div style={styles.cardIcon}>⚙️</div>
          <h3 style={styles.cardTitle}>Settings</h3>
          <p style={styles.cardText}>
            Customize your preferences and account settings.
          </p>
          <span style={styles.cardArrow}>→</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "60px 40px",
    minHeight: "calc(100vh - 70px)",
    background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)",
  },
  header: {
    textAlign: "center",
    marginBottom: "50px",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: "10px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  subtitle: {
    color: "#6b7280",
    fontSize: "1.1rem",
    fontWeight: "400",
  },
  grid: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "30px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  card: {
    width: "280px",
    padding: "35px 25px",
    background: "#ffffff",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    position: "relative",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.8)",
  },
  cardIcon: {
    fontSize: "3rem",
    marginBottom: "20px",
  },
  cardTitle: {
    fontSize: "1.3rem",
    fontWeight: "600",
    color: "#1a1a2e",
    marginBottom: "10px",
  },
  cardText: {
    color: "#6b7280",
    fontSize: "0.95rem",
    lineHeight: "1.6",
  },
  cardArrow: {
    position: "absolute",
    bottom: "25px",
    right: "25px",
    fontSize: "1.5rem",
    color: "#667eea",
    fontWeight: "bold",
  },
};

export default Home;
