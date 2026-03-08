import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";
import styles from "./Login.module.css"; // Reusing your existing styles

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Request OTP, 2: Reset Password
  const navigate = useNavigate();

  // STEP 1: Request the 6-digit code
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Sending OTP...");
    try {
      await api.post("/user/forgot-password", { email });
      toast.success("OTP sent! Check your email (or terminal)", {
        id: loadingToast,
      });
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "User not found", {
        id: loadingToast,
      });
    }
  };

  // STEP 2: Verify OTP and Update Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Updating password...");
    try {
      await api.post("/user/reset-password", { email, otp, newPassword });
      toast.success("Password updated! You can now login.", {
        id: loadingToast,
      });
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP or request", {
        id: loadingToast,
      });
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Panel - Keeping it consistent with Login */}
      <div className={styles.leftPanel}>
        <div className={styles.brandContent}>
          <h1 className={styles.brandTitle}>Account Recovery</h1>
          <p className={styles.brandText}>
            Don't worry, it happens to the best of us. Let's get you back into
            your account.
          </p>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <form
          onSubmit={step === 1 ? handleRequestOTP : handleResetPassword}
          className={styles.form}
        >
          <h2 className={styles.title}>
            {step === 1 ? "Forgot Password" : "Reset Password"}
          </h2>
          <p className={styles.subtitle}>
            {step === 1
              ? "Enter your registered email to receive a verification code."
              : "Enter the 6-digit code sent to your email and your new password."}
          </p>

          {step === 1 ? (
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address</label>
              <input
                type="email"
                className={styles.input}
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          ) : (
            <>
              <div className={styles.inputGroup}>
                <label className={styles.label}>6-Digit OTP</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="123456"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>New Password</label>
                <input
                  type="password"
                  className={styles.input}
                  placeholder="••••••••"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </>
          )}

          <button type="submit" className={styles.button}>
            {step === 1 ? "Send Reset Code" : "Update Password"}
          </button>

          <p className={styles.footerText}>
            Remembered your password?{" "}
            <Link to="/login" className={styles.link}>
              Back to Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
