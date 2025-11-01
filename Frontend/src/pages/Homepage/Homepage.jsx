import React from "react";
import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faUtensils,
  faStar,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { ProductCard } from "@components/index";

const c = classNames.bind(styles);

const Homepage = () => {
  const featuredDishes = [
    {
      id: "1",
      name: "Margherita Pizza",
      description:
        "Classic Italian pizza with fresh mozzarella, tomatoes, and basil",
      price: 14.99,
      image: "https://dishwizard-ai.lovable.app/assets/pizza-CF7rwTo9.jpg",
    },
    {
      id: "2",
      name: "Classic Burger",
      description: "Juicy beef patty with fresh vegetables and special sauce",
      price: 12.99,
      image: "https://dishwizard-ai.lovable.app/assets/burger-BPP60s_r.jpg",
    },
    {
      id: "3",
      name: "Pasta Carbonara",
      description: "Creamy pasta with bacon, eggs, and parmesan cheese",
      price: 13.99,
      image: "https://dishwizard-ai.lovable.app/assets/pasta-CHOSvK-A.jpg",
    },
    {
      id: "4",
      name: "Pasta Carbonara",
      description: "Creamy pasta with bacon, eggs, and parmesan cheese",
      price: 13.99,
      image:
        "https://mblogthumb-phinf.pstatic.net/MjAyNDEyMTJfMTg4/MDAxNzMzOTczMTc2ODQw.p3VF5nrikrromlakKLcr3GT-g7KZSnn4vUWLi5QvAyog.6EDl01rgIa4hvGy0ujjUv1fZX0x8yOg4rOzD9_W8AEog.JPEG/output_909385942.jpg?type=w400",
    },
  ];

  return (
    <div className={c("homepageContainer")}>
      {/* Hero Section */}
      <section className={c("heroSection")}>
        <img
          src="https://rare-gallery.com/mocahbig/5428715-winter-kim-min-jeong-aespa.jpg"
          alt="Delicious food"
          className={c("heroImg")}
        />
        <div className={c("heroOverlay")} />
        <div className="container h-100 d-flex align-items-center">
          <div className={c("heroContent")}>
            <h1 className="display-4 fw-bold mb-3">
              Delicious Food
              <br />
              Delivered to Your Door
            </h1>
            <p className="lead mb-4">
              Experience the finest cuisines from around the world. Order now
              and satisfy your cravings!
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <Link
                to="/dishes"
                className="btn btn-primary btn-lg d-flex align-items-center gap-2"
              >
                Order Now <FontAwesomeIcon icon={faArrowRight} />
              </Link>
              <Link
                to="/combos"
                className="btn btn-outline-light btn-lg d-flex align-items-center gap-2"
              >
                View Combos <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section – 4 cards responsive */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
            <div>
              <h2 className="fw-bold mb-1">Featured Dishes</h2>
              <p className="text-muted">Explore our most popular items</p>
            </div>
            <Link
              to="/dishes"
              className="btn btn-outline-primary d-flex align-items-center gap-2 mt-2"
            >
              View All <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
          <div className="row g-4">
            {featuredDishes.map((dish) => (
              <div key={dish.id} className="col-6  col-lg-3">
                <ProductCard
                  image={dish.image}
                  badge="Pizza"
                  title={dish.name}
                  description={dish.description}
                  rating={4.8}
                  price={`${dish.price.toFixed(2)} vnđ`}
                  onAddToCart={() =>
                    alert(`Đã thêm ${dish.name} vào giỏ hàng!`)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
            <div>
              <h2 className="fw-bold mb-1">Featured Dishes</h2>
              <p className="text-muted">Explore our most popular items</p>
            </div>
            <Link
              to="/dishes"
              className="btn btn-outline-primary d-flex align-items-center gap-2 mt-2"
            >
              View All <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
          <div className="row g-4">
            {featuredDishes.map((dish) => (
              <div key={dish.id} className="col-6 col-lg-3">
                <ProductCard
                  image={dish.image}
                  badge="Pizza"
                  title={dish.name}
                  description={dish.description}
                  rating={4.8}
                  price={`${dish.price.toFixed(2)} vnđ`}
                  onAddToCart={() =>
                    alert(`Đã thêm ${dish.name} vào giỏ hàng!`)
                  }
                />
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
            Start Ordering <FontAwesomeIcon icon={faArrowRight} />
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
