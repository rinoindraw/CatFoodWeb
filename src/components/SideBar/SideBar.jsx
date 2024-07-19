import React, { useState } from "react";
import styles from "./SideBar.module.css";
import SidebarLink from "./SidebarLink";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineLightMode, MdDarkMode, MdSpaceDashboard } from "react-icons/md";
import { BsPersonFill, BsFillTrash2Fill } from "react-icons/bs";
import { MdBarChart } from "react-icons/md";
import guandangImg from '../../assets/guandang.png'
import { FaCat, FaCameraRetro } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";

const SideBar = ({
  darkMode,
  toggleDarkMode,
  sidebarClosed,
  handleSidebarToggle,
}) => {
  const switchClassName = darkMode ? "switch dark" : "switch";
  const sidebarClassName = `${styles.sidebar} ${
    sidebarClosed ? styles.close : ""
  }`;

  return (
    <nav
      className={`${styles.sidebar} ${darkMode ? styles.dark : ""} ${
        sidebarClosed ? styles.close : ""
      }`}
    >
      <header>
        <div className={styles.imageText}>
          <span className={styles.image}>
            {darkMode ? (
              <img src={guandangImg} alt="logo" />
            ) : (
              <img src={guandangImg} alt="logo" />
            )}
          </span>

          <div className={`${styles.text} ${styles.headerText}`}>
            <span className={styles.name}>Kucing</span>
          </div>
        </div>

        <MdOutlineKeyboardArrowRight
          className={styles.toggle}
          onClick={handleSidebarToggle}
        />
      </header>
      <div className={styles.menuBar}>
        <div className={styles.menu}>
          <ul className={styles["menu-links"]}>
            <SidebarLink
              icon={<FaCat className={styles.icon} />}
              text={"Dashboard"}
              to={"/"}
            />
            <SidebarLink
              icon={<FaChartLine className={styles.icon} />}
              text={"Line Chart"}
              to={"/line"}
            />
            <SidebarLink
              icon={<FaCameraRetro className={styles.icon} />}
              text={"Camera"}
              to={"/camera"}
            />
          </ul>
        </div>

        <div className={styles.bottomContent}>
          <li className={styles.mode}>
            <div className={styles.moonSun}>
              {darkMode ? (
                <i className={`${styles.icon} ${styles.moon}`}>
                  <MdDarkMode />
                </i>
              ) : (
                <i className={`${styles.icon} ${styles.sun}`}>
                  <MdOutlineLightMode />
                </i>
              )}
            </div>
            <span className={`${styles.modeText} ${styles.text}`}>
              {darkMode ? "Light " : "Dark "}Theme
            </span>
            <div
              className={`${styles.toggleSwitch} ${styles[switchClassName]}`}
              onClick={toggleDarkMode}
            >
              <span className={styles.switch}></span>
            </div>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
