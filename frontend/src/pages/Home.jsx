import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome back, {user?.username}! 👋</h1>
        <p className={styles.subtitle}>
          You are successfully logged into your dashboard.
        </p>
      </div>

      <div className={styles.grid}>
        {/* Profile Card */}
        <div className={styles.card} onClick={() => navigate("/profile")}>
          <div className={styles.cardIcon}>👤</div>
          <h3 className={styles.cardTitle}>My Profile</h3>
          <p className={styles.cardText}>
            View and edit your personal information and bio.
          </p>
          <span className={styles.cardArrow}>→</span>
        </div>

        {/* Statistics Card */}
        <div className={styles.card}>
          <div className={styles.cardIcon}>📊</div>
          <h3 className={styles.cardTitle}>Statistics</h3>
          <p className={styles.cardText}>
            Check your latest activity and app usage data.
          </p>
          <span className={styles.cardArrow}>→</span>
        </div>

        {/* Settings Card */}
        <div className={styles.card}>
          <div className={styles.cardIcon}>⚙️</div>
          <h3 className={styles.cardTitle}>Settings</h3>
          <p className={styles.cardText}>
            Customize your preferences and account settings.
          </p>
          <span className={styles.cardArrow}>→</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
