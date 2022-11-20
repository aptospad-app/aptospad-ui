import React, {useState, useRef} from "react";
import "./index.scss";
import {NavLink, useLocation, matchPath} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {CustomHookUtility} from "@/Utilities";

export default function HeaderBottom() {
  const location = useLocation();
  const {t} = useTranslation();

  const isSubMenuActive = () => {
    const subRoutes = [
      "document",
      "about-us"
    ];

    for (const subRoute of subRoutes) {
      if (matchPath(subRoute, location.pathname)) {
        return true;
      }
    }

    return false;
  };

  const closeMenu = () => {
    [...document.getElementsByClassName("menu-item")].forEach(
      (element, index, array) => {
        element.classList.remove("open");
      }
    );
  };

  const handleClickMenu: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const isOpen = e.currentTarget.classList.contains("open");
    closeMenu();
    if (!isOpen) {
      e.currentTarget.classList.add("open");
    }
  };

  return (
    <div id="header-bottom" className="d-block d-lg-none">
      <ul className="menu m-0 p-0 d-flex justify-content-around">
        <li>
          <div
            className={`menu-item menu-green  ${isSubMenuActive() ? "active" : ""}`}
            role="button"
            onClick={handleClickMenu}
          >
            <i className="fa fa-terminal icon" aria-hidden="true"></i>
            <span className="text">Products</span>

            <div className="wrap-sub-menu">
              <ul className="sub-menu p-0">
                <li>
                  <NavLink
                    to="/ido-projects"
                  >
                    <span className="text ms-2">IDO Projects</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/community-voting"
                  >
                    <span className="text ms-2">Community voting</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/staking"
                  >
                    <span className="text ms-2">Stake APD</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/governance"
                  >
                    <span className="text ms-2">Governance</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/swap"
                  >
                    <span className="text ms-2">Swap</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/portfolio"
                  >
                    <span className="text ms-2">Portfolio</span>
                  </NavLink>
                </li>
              </ul>
            </div>

          </div>
        </li>
        <li>
          <NavLink
            to="/"
            className={({isActive}) => isActive ? "menu-blue active" : "menu-blue"}
          >
            <i className="fa fa-home icon" aria-hidden="true"></i>
            <span className="text">{t("home")}</span>
          </NavLink>
        </li>
        <li>
          <div
            className={`menu-item menu-violet  ${isSubMenuActive() ? "active" : ""}`}
            role="button"
            onClick={handleClickMenu}
          >
            <i className="fa fa-users icon" aria-hidden="true"></i>
            <span className="text">Community</span>

            <div className="wrap-sub-menu">
              <ul className="sub-menu p-0">
                <li>
                  <a href="https://twitter.com/Aptospad_DAO" target="_blank" rel="noreferrer">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="https://discord.gg/aptospad" target="_blank" rel="noreferrer">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="" target="_blank" rel="noreferrer">
                    Crew3
                  </a>
                </li>
                <li>
                  <a href="" target="_blank" rel="noreferrer">
                    Medium
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </li>
      </ul>
    </div>
  );
}
