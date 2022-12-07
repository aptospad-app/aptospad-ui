import React, {useEffect} from "react";
import "./index.scss";
import {Link, NavLink, useLocation, matchPath} from "react-router-dom";
import {useAppDispatch, useAppSelector, PopupsActions} from "@/MyRedux";
import {useTranslation} from "react-i18next";
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import WalletInteractComponent from "./Components/WalletInteract";
import LanguageComponent from "./Components/Language";
import {toast} from "react-toastify";
import {ReactComponent as DiscordIcon} from "@/Assets/Images/Social/Discord.svg";
import {ReactComponent as Crew3Icon} from "@/Assets/Images/Social/Crew3.svg";

function Header() {
  const dispatch = useAppDispatch();
  const aptosWalletAdapter = useWallet();
  const location = useLocation();
  const {t} = useTranslation();

  const isSubMenuActive = (menuName: "products") => {
    let subRoutes: Array<string> = [];

    if (menuName === "products") {
      subRoutes = [
        "ido-projects",
        "community-voting",
        "staking",
        "governance",
        "swap",
        "portfolio"
      ];
    }

    for (const subRoute of subRoutes) {
      if (matchPath(subRoute, location.pathname)) {
        return true;
      }
    }

    return false;
  };

  const toggleSubmenu: React.MouseEventHandler = (e) => {
    const subMenu = e.currentTarget.querySelector(".wrap-sub-menu");
    if (!subMenu) {
      return;
    }
    if (subMenu.style.display === "block") {
      subMenu.style.display = "none";
    } else {
      subMenu.style.display = "block";
    }
  };

  const handleMouseOverMenu: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.currentTarget.getElementsByClassName("wrap-sub-menu")[0].style.display = "block";
  };

  const handleMouseOutMenu: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.currentTarget.getElementsByClassName("wrap-sub-menu")[0].style.display = "none";
  };

  const onClikcReferral: React.MouseEventHandler<HTMLElement> = (e) => {
    if (aptosWalletAdapter.connected) {
      dispatch(PopupsActions.togglePopup({"popupName": "referral", "display": true}));
    } else {
      toast.warn("First, you must connect your wallet.");
    }
  };

  return (
    <div id="header" className="container-fluid">
      <div id="logo" className="me-4">
        <Link to="/" className="h-100 d-flex align-items-center">
          <img className="logo-icon" src="/images/logo-icon-text.svg" alt="" />
        </Link>
      </div>

      <div className="header-left d-none d-lg-block">
        <ul className="menu m-0 p-0 d-flex">
          <li>
            <div
              className={`menu-item ${isSubMenuActive("products") ? "active" : ""}`}
              onClick={toggleSubmenu}
              onMouseOver={handleMouseOverMenu}
              onMouseOut={handleMouseOutMenu}
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
                        <p className="text">Stake APD</p>
                        <p className="sub-text">Buy APD and stake it</p>
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
              className={`menu-item`}
              onClick={toggleSubmenu}
              onMouseOver={handleMouseOverMenu}
              onMouseOut={handleMouseOutMenu}
            >
              <span className="text">
                Community
                <i className="fa fa-caret-down ms-1" aria-hidden="true"></i>
              </span>

              <div className="container wrap-sub-menu">
                <div className="row sub-menu">
                  <div className="col-6">
                    <a href={process.env.TWITTER} target="_blank" rel="noreferrer" className="sub-menu-item">
                      <div className="icon">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </div>
                      <div className="description">
                        <p className="text">Twitter</p>
                        <p className="sub-text">Follow the latest news, features and projects from AptosPad</p>
                      </div>
                    </a>
                  </div>

                  <div className="col-6">
                    <a href={process.env.DISCORD} target="_blank" rel="noreferrer" className="sub-menu-item">
                      <div className="icon">
                        <DiscordIcon />
                      </div>
                      <div className="description">
                        <p className="text">Discord</p>
                        <p className="sub-text">Become part of AptosPad community and chat away</p>
                      </div>
                    </a>
                  </div>

                  <div className="col-6">
                    <a href={process.env.CREW3} target="_blank" rel="noreferrer" className="sub-menu-item">
                      <div className="icon">
                        <Crew3Icon />
                      </div>
                      <div className="description">
                        <p className="text">Crew3</p>
                        <p className="sub-text">Join Crew3 to do quests and earn XP</p>
                      </div>
                    </a>
                  </div>

                  <div className="col-6">
                    <a href={process.env.MEDIUM} target="_blank" rel="noreferrer" className="sub-menu-item">
                      <div className="icon">
                        <i className="fa fa-medium" aria-hidden="true"></i>
                      </div>
                      <div className="description">
                        <p className="text">Medium</p>
                        <p className="sub-text">Learn more about Aptospad and IDO projects through articles</p>
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
              className="menu-item"
            >
              <span className="text">Buy APD</span>
            </NavLink>
          </li>
          <li onClick={onClikcReferral}>
            <div className={`menu-item`}>
              <span className="text">Referral</span>
            </div>
          </li>
          <li className="d-flex align-items-center mx-2">
            <NavLink
              to="/buy-test"
              className="cbtn btn-gradient-blue py-1"
              style={{"height": "initial"}}
            >
              Testnet
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
