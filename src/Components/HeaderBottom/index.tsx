import React, {useState, useRef} from "react";
import "./index.scss";
import {NavLink, useLocation, matchPath} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {CustomHookUtility} from "@/Utilities";

export default function HeaderBottom() {
  const location = useLocation();
  const [isSubMenuDisplayed, setIsSubMenuDisplayed] = useState<boolean>(false);
  const subMenyRef = useRef<HTMLDivElement>(null);
  CustomHookUtility.useOnClickOutside(subMenyRef, () => setIsSubMenuDisplayed(false));
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

  return (
    <div id="header-bottom" className="d-block d-lg-none">
      <ul className="menu m-0 p-0 d-flex justify-content-around">
        {/* <li>
          <a
            href={`/`}
            className="menu-green"
            rel="noreferrer"
            target="_blank"
          >
            <img className="icon" src="/images/logo-icon.svg" alt="rip coin" />
            <span className="text">ATP</span>
          </a>
        </li> */}
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
            className={`menu-violet  ${isSubMenuActive() ? "active" : ""}`}
            role="button"
            ref={subMenyRef}
            onClick={() => setIsSubMenuDisplayed(!isSubMenuDisplayed)}
          >
            <i className="fa fa-ellipsis-h icon" aria-hidden="true"></i>
            <span className="text">More</span>

            {
              isSubMenuDisplayed &&
              <div id="wrap-sub-menu">
                <ul id="sub-menu" className="p-0">
                  <li>
                    <NavLink
                      to="/idos"
                    >
                      <span className="text ms-2">IDOs</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/staking"
                    >
                      <span className="text ms-2">Staking</span>
                    </NavLink>
                  </li>
                  <li data-tip={`<div class="text-center">When we get 5000 <a class="text-white" href="https://twitter.com/Aptospad_DAO" target="_blank">Twitter</a> followers, we will share the Discord link. <br/> Help us quickly accomplish our aim.</div>`}>
                    {/* <a href="https://discord.gg/rb8tJQ4yAa" target="_blank" rel="noreferrer">
                      <span className="text ms-2">Community</span>
                    </a> */}
                    <NavLink
                      to="/"
                    >
                      <span className="text ms-2">Community</span>
                    </NavLink>
                  </li>
                  <li>
                    <a href="https://github.com/aptospad-app" target="_blank" rel="noreferrer">
                      <span className="text ms-2">Document</span>
                    </a>
                  </li>
                </ul>
              </div>
            }

          </div>
        </li>
      </ul>
    </div>
  );
}
