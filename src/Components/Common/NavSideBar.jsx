import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./NavSideBar.module.css";
import logo from "../../assets/Designer.png";
import home from "../../assets/icons/home.json";
import elections from "../../assets/icons/vote-elections.json";
import profile from "../../assets/icons/avatar.json";
import settings from "../../assets/icons/tool.json";
import man from "../../assets/icons/man.json";
import AnimatedIcon from "../Common/AnimatedIcon";

const NavSideBar = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebarHeader}>
        <img className={styles.sidebarLogo} src={logo} alt="Logo" />
        <h3 className={styles.sidebarTitle}>Election Pulse</h3>
      </div>
      <nav className={styles.sidebarNav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `${styles.sidebarLink} ${styles.active}`
              : styles.sidebarLink
          }
        >
          <span className={styles.sidebarLinkIcon}>
            <AnimatedIcon
              source={home}
              width="30px"
              height="30px"
              autoplay={location.pathname === "/" ? true : false}
              loop={location.pathname === "/" ? true : false}
            />
          </span>
          <h4>Home</h4>
        </NavLink>
        <NavLink
          to="/elections"
          className={({ isActive }) =>
            isActive
              ? `${styles.sidebarLink} ${styles.active}`
              : styles.sidebarLink
          }
        >
          <span className={styles.sidebarLinkIcon}>
            <AnimatedIcon
              source={elections}
              width="30px"
              height="30px"
              autoplay={location.pathname === "/elections" ? true : false}
              loop={location.pathname === "/elections" ? true : false}
            />
          </span>
          <h4>Elections</h4>
        </NavLink>
        <NavLink
          to="/employees"
          className={({ isActive }) =>
            isActive
              ? `${styles.sidebarLink} ${styles.active}`
              : styles.sidebarLink
          }
        >
          <span className={styles.sidebarLinkIcon}>
            <AnimatedIcon
              source={man}
              width="30px"
              height="30px"
              autoplay={location.pathname === "/employees" ? true : false}
              loop={location.pathname === "/employees" ? true : false}
            />
          </span>
          <h4>Employees</h4>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? `${styles.sidebarLink} ${styles.active}`
              : styles.sidebarLink
          }
        >
          <span className={styles.sidebarLinkIcon}>
            <AnimatedIcon
              source={profile}
              width="30px"
              height="30px"
              autoplay={location.pathname === "/profile" ? true : false}
              loop={location.pathname === "/profile" ? true : false}
            />
          </span>
          <h4>Profile</h4>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? `${styles.sidebarLink} ${styles.active}`
              : styles.sidebarLink
          }
        >
          <span className={styles.sidebarLinkIcon}>
            <AnimatedIcon
              source={settings}
              width="30px"
              height="30px"
              autoplay={location.pathname === "/settings" ? true : false}
              loop={location.pathname === "/settings" ? true : false}
            />
          </span>
          <h4>Settings</h4>
        </NavLink>
      </nav>
    </div>
  );
};

export default NavSideBar;
