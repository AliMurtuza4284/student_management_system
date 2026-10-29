import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleReset(e) {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("studentUser") || "null");

    if (!user || user.email.toLowerCase() !== email.trim().toLowerCase()) {
      alert("No account found with this email.");
      return;
    }

    if (password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    user.password = password;
    localStorage.setItem("studentUser", JSON.stringify(user));

    alert("Password updated. Please login.");
    navigate("/");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🔐</div>
        <h1>Reset Password</h1>
        <p className="subtitle">
          Enter your registered email and choose a new password.
        </p>

        <form onSubmit={handleReset}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          <label>Confirm New Password</label>
          <input
            type="password"
            placeholder="Enter new password again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={6}
            required
          />

          <button className="primary-btn" type="submit">
            Update Password →
          </button>
        </form>

        <p className="auth-footer">
          Remember your password? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;