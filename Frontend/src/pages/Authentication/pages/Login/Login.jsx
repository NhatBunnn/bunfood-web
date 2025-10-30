import React from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import classNames from "classnames/bind";

const c = classNames.bind(styles);

const Login = () => {
  return (
    <div className={c("loginContainer")}>
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
            <h1 className="h3 fw-bold mb-2">Welcome Back</h1>
            <p className="text-muted">Login to continue your food journey</p>
          </div>

          <form className="d-flex flex-column gap-3">
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
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-primary text-decoration-none small"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 btn-lg">
              Login
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-muted mb-0">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary fw-semibold text-decoration-none"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
