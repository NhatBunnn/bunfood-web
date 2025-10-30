import React from "react";
import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import classNames from "classnames/bind";

const c = classNames.bind(styles);

const Homepage = () => {
  const featuredDishes = [
    {
      id: "1",
      name: "Margherita Pizza",
      description:
        "Classic Italian pizza with fresh mozzarella, tomatoes, and basil",
      price: 14.99,
      image: "pizza.jpg",
    },
    {
      id: "2",
      name: "Classic Burger",
      description: "Juicy beef patty with fresh vegetables and special sauce",
      price: 12.99,
      image: "burger.jpg",
    },
    {
      id: "3",
      name: "Pasta Carbonara",
      description: "Creamy pasta with bacon, eggs, and parmesan cheese",
      price: 13.99,
      image: "pasta.jpg",
    },
  ];

  return (
    <div className={c("homepageContainer")}>
      {/* Header */}
      <header className={c("header")}>
        <h2 className="text-center">Header</h2>
      </header>

      {/* Hero Section */}
      <section className={c("heroSection")}>
        <img
          src="hero-banner.jpg"
          alt="Delicious food"
          className={c("heroImg")}
        />
        <div className={c("heroOverlay")} />
        <div className="container h-100 d-flex align-items-center">
          <div className="text-white" style={{ maxWidth: "600px" }}>
            <h1 className="display-4 fw-bold mb-3">
              Delicious Food
              <br />
              Delivered to Your Door
            </h1>
            <p className="lead mb-4">
              Experience the finest cuisines from around the world. Order now
              and satisfy your cravings!
            </p>
            <div className="d-flex gap-3">
              <Link
                to="/dishes"
                className="btn btn-primary btn-lg d-flex align-items-center gap-2"
              >
                Order Now ➡️
              </Link>
              <Link to="/combos" className="btn btn-outline-light btn-lg">
                View Combos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-4">
              <div className="p-4 bg-white rounded shadow-sm">
                <div
                  className="mb-3 d-flex justify-content-center align-items-center rounded-circle bg-primary text-white"
                  style={{ width: "64px", height: "64px" }}
                >
                  ⏱️
                </div>
                <h5 className="fw-semibold">Fast Delivery</h5>
                <p className="text-muted">
                  Get your food delivered within 30 minutes
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-white rounded shadow-sm">
                <div
                  className="mb-3 d-flex justify-content-center align-items-center rounded-circle bg-primary text-white"
                  style={{ width: "64px", height: "64px" }}
                >
                  👨‍🍳
                </div>
                <h5 className="fw-semibold">Expert Chefs</h5>
                <p className="text-muted">
                  Prepared by professional chefs with love
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-white rounded shadow-sm">
                <div
                  className="mb-3 d-flex justify-content-center align-items-center rounded-circle bg-primary text-white"
                  style={{ width: "64px", height: "64px" }}
                >
                  ⭐
                </div>
                <h5 className="fw-semibold">Top Quality</h5>
                <p className="text-muted">Only the freshest ingredients used</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold mb-1">Featured Dishes</h2>
              <p className="text-muted">Explore our most popular items</p>
            </div>
            <Link
              to="/dishes"
              className="btn btn-outline-primary d-flex align-items-center gap-2"
            >
              View All 📈
            </Link>
          </div>

          <div className="row g-4">
            {featuredDishes.map((dish) => (
              <div key={dish.id} className="col-md-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={dish.image}
                    className="card-img-top"
                    alt={dish.name}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{dish.name}</h5>
                    <p className="card-text text-muted">{dish.description}</p>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <span className="fw-bold">${dish.price}</span>
                      <button className="btn btn-sm btn-primary">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={c("ctaSection")}>
        <div className="container text-center text-white py-5">
          <h2 className="display-5 fw-bold mb-3">Ready to Order?</h2>
          <p className="lead mb-4">
            Join thousands of satisfied customers enjoying our delicious food
          </p>
          <Link
            to="/dishes"
            className="btn btn-lg btn-light d-flex align-items-center gap-2 mx-auto"
          >
            Start Ordering ➡️
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-light border-top py-3">
        <div className="container text-center text-muted">
          <p>&copy; 2025 FoodHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
