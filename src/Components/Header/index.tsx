import React from "react";
import "./index.scss";
import {Link, NavLink, useLocation, matchPath} from "react-router-dom";
import {useAppSelector} from "@/MyRedux";
import {useTranslation} from "react-i18next";
import WalletInteractComponent from "./Components/WalletInteract";
import LanguageComponent from "./Components/Language";
import {toast} from "react-toastify";

function Header() {
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

  const toggleSubMenu = (toggle: boolean) => {
    document.querySelector("#header #wrap-sub-menu")!.style.display = toggle ? "block" : "none";
  };

  return (
    <div id="header" className="container-fluid">
      <div id="logo" className="me-4">
        <Link to="/" className="h-100 d-flex align-items-center">
          <img className="logo-icon" src="/images/logo.svg" alt="" />
        </Link>
      </div>

      <div className="header-left d-none d-lg-block">
        <ul className="menu m-0 p-0 d-flex">
          <li>
            <NavLink
              to="/idos"
              className={({isActive}) => isActive ? "menu-blue active" : "menu-blue"}
            >
              <span className="text ms-2">IDOs</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/staking"
              className={({isActive}) => isActive ? "menu-blue active" : "menu-blue"}
            >
              <span className="text ms-2">Staking</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/community"
              className={({isActive}) => isActive ? "menu-blue active" : "menu-blue"}
            >
              <span className="text ms-2">Community</span>
            </NavLink>
          </li>
          <li>
            <a className="menu-blue" href="https://github.com/aptospad-app" target="_blank" rel="noreferrer">
              <span className="text ms-2">Document</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="header-right d-flex">
        {/* <div className="stack d-none d-sm-flex align-items-center" role="button">
          <img src="/images/logo-icon.svg" className="me-1" alt="mmo crypto" style={{"width": "24px"}} />
          <span>$0</span>
        </div> */}
        <div className="stack d-none d-md-flex align-items-center">
          <WalletInteractComponent />
        </div>
        <div className="stack d-flex align-items-center">
          <LanguageComponent />
        </div>
      </div>
    </div>
  );
}

export default Header;
