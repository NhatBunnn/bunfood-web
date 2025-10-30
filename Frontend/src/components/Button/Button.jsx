import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Button.module.css";
import classNames from "classnames/bind";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const c = classNames.bind(styles);

/**
 * @typedef {"default" | "menu" | "outline"} ButtonVariant
 */

/**
 * @param {{
 *  label?: string,
 *  icon?: any,
 *  type?: "button" | "submit" | "reset",
 *  onClick?: Function,
 *  isLoading?: boolean,
 *  to?: string,
 *  className?: string,
 *  variant?: ButtonVariant
 * }} props
 */

function Button({
  label = "",
  icon,
  type = "button",
  onClick,
  isLoading = false,
  to = "",
  className,
  variant = "default",
}) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (to) navigate(to);
    else onClick?.(e);
  };

  return (
    <button
      className={c("button", variant, className, { loading: isLoading })}
      type={type}
      onClick={handleClick}
      disabled={isLoading}
    >
      {icon && !isLoading && (
        <div className={c("icon")}>
          <FontAwesomeIcon icon={icon} />
        </div>
      )}
      <div className={c("label")}>
        {isLoading ? (
          <FontAwesomeIcon icon={faSpinner} spin className={c("spinner")} />
        ) : (
          label
        )}
      </div>
    </button>
  );
}

export default Button;
