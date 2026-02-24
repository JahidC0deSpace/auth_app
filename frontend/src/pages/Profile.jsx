import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api";
import styles from "./Profile.module.css";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({ username: "", bio: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true); // New state to track initial fetch

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile");
        setProfileData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Simple validation: Don't allow empty usernames
    if (!profileData.username.trim()) {
      toast.error("Username cannot be empty");
      return;
    }

    try {
      const res = await api.put("/user/profile/update", {
        username: profileData.username,
        bio: profileData.bio,
      });
      login({ ...user, username: res.data.username });
      setIsEditing(false);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  // Check the loading boolean instead of the username string
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            {/* Added optional chaining and fallback to prevent crashes if name is empty */}
            {profileData.username?.charAt(0).toUpperCase() || "?"}
          </div>
          <div className={styles.statusBadge}>Active</div>
        </div>

        {isEditing ? (
          <form onSubmit={handleUpdate} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Username</label>
              <input
                type="text"
                className={styles.input}
                value={profileData.username}
                onChange={(e) =>
                  setProfileData({ ...profileData, username: e.target.value })
                }
                placeholder="Enter username"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Bio</label>
              <textarea
                className={styles.textarea}
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData({ ...profileData, bio: e.target.value })
                }
                rows="4"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.saveButton}>
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className={styles.profileInfo}>
            <h2 className={styles.username}>{profileData.username}</h2>
            <p className={styles.bio}>
              {profileData.bio || "No bio added yet."}
            </p>

            <div className={styles.statsRow}>
              <div className={styles.stat}>
                <span className={styles.statValue}>12</span>
                <span className={styles.statLabel}>Posts</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>248</span>
                <span className={styles.statLabel}>Followers</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>186</span>
                <span className={styles.statLabel}>Following</span>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className={styles.editButton}
            >
              ✏️ Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
