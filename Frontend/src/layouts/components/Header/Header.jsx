import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import classNames from "classnames/bind";

const c = classNames.bind(styles);

const Header = ({ cartItemCount = 0 }) => {
  return (
    <header
      className={c("header") + " sticky-top shadow-sm bg-white border-bottom"}
    >
      <div className="container d-flex align-items-center justify-content-between py-2">
        {/* Logo */}
        <Link to="/" className="d-flex align-items-center text-decoration-none">
          <div
            className={
              c("logoCircle") +
              " d-flex align-items-center justify-content-center me-2"
            }
          >
            <span className={c("logoText")}>F</span>
          </div>
          <span className="h5 mb-0 fw-bold text-dark">FoodHub</span>
        </Link>

        {/* Navigation */}
        <nav className="d-none d-md-flex align-items-center gap-4">
          <Link to="/" className="text-dark text-decoration-none fw-medium">
            Home
          </Link>
          <Link
            to="/dishes"
            className="text-dark text-decoration-none fw-medium"
          >
            Dishes
          </Link>
          <Link
            to="/combos"
            className="text-dark text-decoration-none fw-medium"
          >
            Combos
          </Link>
          <Link
            to="/admin"
            className="text-dark text-decoration-none fw-medium"
          >
            Admin
          </Link>
        </nav>

        {/* Actions */}
        <div className="d-flex align-items-center gap-3">
          {/* Search */}
          <div className="d-none d-lg-flex position-relative">
            <span className={c("searchIcon")}>🔍</span>
            <input
              type="search"
              placeholder="Search dishes..."
              className={c("searchInput") + " form-control"}
            />
          </div>

          {/* Cart */}
          <Link to="/cart" className="position-relative">
            <button className="btn btn-outline-secondary position-relative">
              🛒
              {cartItemCount > 0 && (
                <span
                  className={
                    c("cartBadge") +
                    " position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  }
                >
                  {cartItemCount}
                </span>
              )}
            </button>
          </Link>

          {/* User */}
          <button className="btn btn-outline-secondary">👤</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
