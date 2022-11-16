import React, {useEffect} from "react";
import "./index.scss";
import {Link, NavLink, useLocation, matchPath} from "react-router-dom";
import {useAppSelector} from "@/MyRedux";
import {useTranslation} from "react-i18next";
import WalletInteractComponent from "./Components/WalletInteract";
import LanguageComponent from "./Components/Language";
import {toast} from "react-toastify";
import {ReactComponent as DiscordIcon} from "@/Assets/Images/Social/Discord.svg";
import {ReactComponent as Crew3Icon} from "@/Assets/Images/Social/Crew3.svg";

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
    <div id="header" className="container-fluid">
      <div id="logo" className="me-4">
        <Link to="/" className="h-100 d-flex align-items-center">
          <img className="logo-icon" src="/images/logo-icon-text.png" alt="" />
        </Link>
      </div>

      <div className="header-left d-none d-lg-block">
        <ul className="menu m-0 p-0 d-flex">
          <li>
            <div
              className={`menu-item menu-blue ${isSubMenuActive() ? "active" : ""}`}
              onClick={handleClickMenu}
            >
              <span className="text">
                Products
                <i className="fa fa-caret-down ms-1" aria-hidden="true"></i>
              </span>

              <div className="container wrap-sub-menu">
                <div className="row sub-menu">
                  <div className="col-6">
                    <NavLink to="/ido-projects" className="sub-menu-item">
                      <div className="icon">
                        <i className="fa fa-terminal" aria-hidden="true"></i>
                      </div>
                      <div className="description">
                        <p className="text">IDO Projects</p>
                        <p className="sub-text">Browser upcoming sale</p>
                      </div>
                    </NavLink>
                  </div>
                  <div className="col-6">
                    <NavLink to="/community-voting" className="sub-menu-item">
                      <div className="icon">
                        <i className="fa fa-users" aria-hidden="true"></i>
                      </div>
                      <div className="description">
                        <p className="text">Community voting</p>
                        <p className="sub-text">Vote for projects</p>
                      </div>
                    </NavLink>
                  </div>
                  <div className="col-6">
                    <NavLink to="/staking" className="sub-menu-item">
                      <div className="icon">
                        <i className="fa fa-optin-monster" aria-hidden="true"></i>
                      </div>
                      <div className="description">
                        <p className="text">Stake ATP</p>
                        <p className="sub-text">Buy ATP and stake it</p>
                      </div>
                    </NavLink>
                  </div>
                  <div className="col-6">
                    <NavLink to="/governance" className="sub-menu-item">
                      <div className="icon">
                        <i className="fa fa-sticky-note-o" aria-hidden="true"></i>
                      </div>
                      <div className="description">
                        <p className="text">Governance</p>
                        <p className="sub-text">Vote for ecosystem changes</p>
                      </div>
                    </NavLink>
                  </div>
                  <div className="col-6">
                    <NavLink to="/swap" className="sub-menu-item">
                      <div className="icon">
                        <i className="fa fa-exchange" aria-hidden="true"></i>
                      </div>
                      <div className="description">
                        <p className="text">Swap</p>
                        <p className="sub-text">Trade your tokens</p>
                      </div>
                    </NavLink>
                  </div>
                  <div className="col-6">
                    <NavLink to="/portfolio" className="sub-menu-item">
                      <div className="icon">
                        <i className="fa fa-list-ol" aria-hidden="true"></i>
                      </div>
                      <div className="description">
                        <p className="text">Portfolio</p>
                        <p className="sub-text">Manage your allocations</p>
                      </div>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div
              className={`menu-item menu-blue ${isSubMenuActive() ? "active" : ""}`}
              onClick={handleClickMenu}
            >
              <span className="text">
                Community
                <i className="fa fa-caret-down ms-1" aria-hidden="true"></i>
              </span>

              <div className="container wrap-sub-menu">
                <div className="row sub-menu">
                  <div className="col-6">
                    <a href="https://twitter.com/Aptospad_DAO" target="_blank" rel="noreferrer" className="sub-menu-item">
                      <div className="icon">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </div>
                      <div className="description">
                        <p className="text">Twitter</p>
                        <p className="sub-text"></p>
                      </div>
                    </a>
                  </div>

                  <div className="col-6">
                    <a href="https://discord.gg/aptospad" target="_blank" rel="noreferrer" className="sub-menu-item">
                      <div className="icon">
                        <DiscordIcon />
                      </div>
                      <div className="description">
                        <p className="text">Discord</p>
                        <p className="sub-text"></p>
                      </div>
                    </a>
                  </div>

                  <div className="col-6">
                    <a href="/" target="_blank" rel="noreferrer" className="sub-menu-item">
                      <div className="icon">
                        <Crew3Icon />
                      </div>
                      <div className="description">
                        <p className="text">Crew3</p>
                        <p className="sub-text"></p>
                      </div>
                    </a>
                  </div>

                  <div className="col-6">
                    <a href="/" target="_blank" rel="noreferrer" className="sub-menu-item">
                      <div className="icon">
                        <i className="fa fa-medium" aria-hidden="true"></i>
                      </div>
                      <div className="description">
                        <p className="text">Medium</p>
                        <p className="sub-text"></p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <NavLink
              to="/buy"
              className={({isActive}) => isActive ? "menu-blue active" : "menu-blue"}
            >
              <span className="text">Buy ATP</span>
            </NavLink>
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
