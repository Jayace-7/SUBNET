import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminButton from "../components/common/AdminButton";
import Logo from "../../components/common/Logo";

// Demo sign-in opens the dashboard without authenticating; registration stays unconnected.
function AdminAuth() {
  const [mode, setMode] = useState("login");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (mode === "login") navigate("/admin/dashboard");
  }

  function switchMode(nextMode) {
    setMode(nextMode);
    setIsPasswordVisible(false);
  }

  const isRegistration = mode === "register";

  return (
    <main className="admin-module admin-login">
      <section
        className="admin-login__panel"
        aria-labelledby="admin-login-title"
      >
        <Logo height={48} className="admin-login__logo" />
        <div
          key={mode}
          className={`admin-auth__content admin-auth__content--${mode}`}
        >
          <p className="admin-eyebrow">ADMINISTRATION</p>
          <h1 id="admin-login-title">
            {isRegistration ? "Create an admin account" : "Welcome, administrator"}
          </h1>
          <p className="admin-login__intro">
            {isRegistration
              ? "Register to request access to the SUBNET administration platform."
              : "Sign in to manage the SUBNET platform."}
          </p>

          <form className="admin-login__form" onSubmit={handleSubmit}>
            {isRegistration && (
              <label className="admin-field">
                <span>Full name</span>
                <input
                  autoComplete="name"
                  name="full-name"
                  placeholder="Enter your full name"
                  required
                />
              </label>
            )}

            <label className="admin-field">
              <span>{isRegistration ? "Email address" : "Email or username"}</span>
              <input
                autoComplete={isRegistration ? "email" : "username"}
                name={isRegistration ? "email" : "username"}
                placeholder={
                  isRegistration
                    ? "Enter your email address"
                    : "Enter your email or username"
                }
                required
                type={isRegistration ? "email" : "text"}
              />
            </label>

            <label className="admin-field">
              <span>Password</span>
              <span className="admin-password-field">
                <input
                  autoComplete={isRegistration ? "new-password" : "current-password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  type={isPasswordVisible ? "text" : "password"}
                />
                <button
                  aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                  aria-pressed={isPasswordVisible}
                  className="admin-text-button"
                  onClick={() => setIsPasswordVisible((visible) => !visible)}
                  type="button"
                >
                  {isPasswordVisible ? "Hide" : "Show"}
                </button>
              </span>
            </label>

            {isRegistration ? (
              <label className="admin-field">
                <span>Confirm password</span>
                <input
                  autoComplete="new-password"
                  name="confirm-password"
                  placeholder="Re-enter your password"
                  required
                  type={isPasswordVisible ? "text" : "password"}
                />
              </label>
            ) : (
              <div className="admin-login__options">
                <label className="admin-checkbox">
                  <input name="remember-me" type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a className="admin-text-link" href="/admin/login#forgot-password">
                  Forgot password?
                </a>
              </div>
            )}

            <AdminButton className="admin-login__submit" type="submit">
              {isRegistration ? "Create account" : "Sign in"}
            </AdminButton>
          </form>

          <p aria-live="polite" className="admin-login__notice">
            {isRegistration
              ? "Registration is not connected yet."
              : "Demo mode: sign-in opens the dashboard without checking credentials."}
          </p>

          <p className="admin-auth__switch">
            {isRegistration ? "Already have an account?" : "Need an admin account?"}{" "}
            <button
              className="admin-text-button"
              onClick={() => switchMode(isRegistration ? "login" : "register")}
              type="button"
            >
              {isRegistration ? "Sign in" : "Register"}
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}

export default AdminAuth;
