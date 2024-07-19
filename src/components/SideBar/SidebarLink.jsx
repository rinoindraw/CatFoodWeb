import React from "react";
import { Link } from "react-router-dom";
import styles from "./SideBar.module.css";

const SidebarLink = ({ icon, text, to }) => {
  return (
    <li className={styles["nav-link"]}>
      <Link to={to} className={styles.link}>
        {icon}
        <span className={`${styles.text} ${styles.navText}`}>{text}</span>
      </Link>
    </li>
  );
};

export default SidebarLink;
