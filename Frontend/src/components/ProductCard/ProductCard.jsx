import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "./ProductCard.module.css";
import classNames from "classnames/bind";

const c = classNames.bind(styles);

/**
 * Props
 * @param {string} image        - URL ảnh sản phẩm
 * @param {string} badge        - Text badge (ví dụ: "Pizza")
 * @param {string} title        - Tên sản phẩm
 * @param {string} description  - Mô tả ngắn
 * @param {number} rating       - Điểm đánh giá (0-5)
 * @param {string|number} price - Giá (có thể là số hoặc chuỗi đã format)
 * @param {function} onAddToCart - Callback khi nhấn nút Add
 */
const ProductCard = ({
  image,
  badge,
  title,
  description,
  rating = 0,
  price,
  onAddToCart,
}) => {
  const handleClick = () => {
    onAddToCart?.({ title, price });
  };

  return (
    <div className={c("productCard")}>
      {/* Image + Badge */}
      <div className={c("imageWrapper")}>
        <img src={image} alt={title} className={c("productImg")} />
        {badge && <span className={c("badge")}>{badge}</span>}
      </div>

      {/* Body */}
      <div className={c("cardBody")}>
        <h3 className={c("title")} title={title}>
          {title}
        </h3>

        <p className={c("desc")}>{description}</p>

        <div className={c("rating")}>
          <FontAwesomeIcon icon={faStar} className={c("star")} />
          <span>{rating.toFixed(1)}</span>
        </div>

        <div className={c("footer")}>
          <span className={c("price")}>{price}</span>
          <button
            className={c("addBtn")}
            onClick={handleClick}
            aria-label={`Thêm ${title} vào giỏ hàng`}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
