import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import classNames from "classnames/bind";
import useRegister from "./useRegister";
import { Button } from "@components/index";

const c = classNames.bind(styles);

const Register = () => {
  const { handleRegister, loading } = useRegister();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleRegister(firstName, lastName, email, password, confirmPassword);
  };

  return (
    <div className={c("registerContainer")}>
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

          <form className="d-flex flex-column gap-3" onSubmit={onSubmit}>
            {/* First name & last name cùng hàng */}
            <div className="d-flex gap-3">
              <div className="flex-fill">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="flex-fill">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <Button type="submit" isLoading={loading} label="register" />
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
