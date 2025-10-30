import React from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import classNames from "classnames/bind";

const c = classNames.bind(styles);

const Register = () => {
  return (
    <div className={c("registerContainer")}>
      <header className={c("header")}>
        {/* Thay bằng component Header của bạn nếu muốn */}
        <h2 className="text-center">Header</h2>
      </header>

      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <div
          className="card p-4 rounded-4 shadow-sm"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <div className="text-center mb-4">
            <h1 className="h3 fw-bold mb-2">Create Account</h1>
            <p className="text-muted">
              Join us and start ordering delicious food
            </p>
          </div>

          <form className="d-flex flex-column gap-3">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your username"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Create a password"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm your password"
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 btn-lg">
              Register
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-muted mb-0">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary fw-semibold text-decoration-none"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
