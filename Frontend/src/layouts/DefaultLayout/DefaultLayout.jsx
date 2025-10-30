import Header from "../components/Header/Header";
import styles from "./DefaultLayout.module.css";
import classNames from "classnames/bind";

const c = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={c("defaultLayout")}>
      <Header />
      {children}
    </div>
  );
}

export default DefaultLayout;
