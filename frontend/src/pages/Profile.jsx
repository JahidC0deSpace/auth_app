import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api";

const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({ username: "", bio: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile");
        setProfileData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/user/profile/update", {
        username: profileData.username,
        bio: profileData.bio,
      });
      login({ ...user, username: res.data.username });
      setIsEditing(false);
      alert("Profile updated!");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  if (!profileData.username) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading profile...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <div style={styles.avatarSection}>
          <div style={styles.avatar}>
            {profileData.username.charAt(0).toUpperCase()}
          </div>
          <div style={styles.statusBadge}>Active</div>
        </div>

        {isEditing ? (
          <form onSubmit={handleUpdate} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Username</label>
              <input
                type="text"
                value={profileData.username}
                onChange={(e) =>
                  setProfileData({ ...profileData, username: e.target.value })
                }
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Bio</label>
              <textarea
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData({ ...profileData, bio: e.target.value })
                }
                style={styles.textarea}
                rows="4"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div style={styles.buttonGroup}>
              <button type="submit" style={styles.saveButton}>
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                style={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div style={styles.profileInfo}>
            <h2 style={styles.username}>{profileData.username}</h2>
            <p style={styles.bio}>
              {profileData.bio || "No bio added yet. Click edit to add one!"}
            </p>

            <div style={styles.statsRow}>
              <div style={styles.stat}>
                <span style={styles.statValue}>12</span>
                <span style={styles.statLabel}>Posts</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statValue}>248</span>
                <span style={styles.statLabel}>Followers</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statValue}>186</span>
                <span style={styles.statLabel}>Following</span>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              style={styles.editButton}
            >
              ✏️ Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "calc(100vh - 70px)",
    background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)",
    padding: "50px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "4px solid #e5e7eb",
    borderTop: "4px solid #667eea",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    marginTop: "20px",
    color: "#6b7280",
    fontSize: "1.1rem",
  },
  profileCard: {
    background: "white",
    borderRadius: "24px",
    padding: "40px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  avatarSection: {
    position: "relative",
    display: "inline-block",
    marginBottom: "25px",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    fontSize: "3rem",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
  },
  statusBadge: {
    position: "absolute",
    bottom: "5px",
    right: "5px",
    background: "#10b981",
    color: "white",
    fontSize: "0.75rem",
    padding: "4px 12px",
    borderRadius: "20px",
    fontWeight: "600",
  },
  profileInfo: {
    marginTop: "10px",
  },
  username: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: "10px",
  },
  bio: {
    color: "#6b7280",
    fontSize: "1rem",
    lineHeight: "1.6",
    marginBottom: "30px",
  },
  statsRow: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    marginBottom: "30px",
    padding: "20px 0",
    borderTop: "1px solid #e5e7eb",
    borderBottom: "1px solid #e5e7eb",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  statValue: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#1a1a2e",
  },
  statLabel: {
    fontSize: "0.85rem",
    color: "#6b7280",
  },
  editButton: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    padding: "14px 35px",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
    transition: "transform 0.2s",
  },
  form: {
    textAlign: "left",
    marginTop: "20px",
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
  textarea: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "2px solid #e5e7eb",
    fontSize: "15px",
    boxSizing: "border-box",
    outline: "none",
    resize: "vertical",
    fontFamily: "inherit",
  },
  buttonGroup: {
    display: "flex",
    gap: "15px",
    marginTop: "25px",
  },
  saveButton: {
    flex: 1,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
  },
  cancelButton: {
    flex: 1,
    background: "#f3f4f6",
    color: "#374151",
    border: "none",
    padding: "14px",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Profile;
