import React from "react";
import style from "./index.module.scss";
import {Link, NavLink, useLocation, matchPath} from "react-router-dom";

export default function Footer() {
  return (
    <div id={`${style["Footer"]}`} className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-6">
          <img className="mb-4" src="/images/logo-icon-text.svg" alt="" style={{"height": "45px"}} />
          <p className={style["contact"]}>Contact: hello@aptospad.app</p>
        </div>
        <div className="col-12 col-md-2">
          <ul className={`${style["list"]}`}>
            <li className={`${style["title"]}`}>AptosPad</li>
            <li>
              <a href="https://github.com/aptospad-app" target="_blank" rel="noreferrer">
                Documents
              </a>
            </li>
            <li>
              <a href="https://forms.gle/1XXuWt819wmcuiv69" target="_blank" rel="noreferrer">
                Apply for project
              </a>
            </li>
          </ul>
        </div>
        <div className="col-12 col-md-2">
          <ul className={`${style["list"]}`}>
            <li className={`${style["title"]}`}>Follow Us</li>
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
          </ul>
        </div>
        <div className="col-12 col-md-2">
          <ul className={`${style["list"]}`}>
            <li className={`${style["title"]}`}>Legal</li>
            <li>
              <Link to="/">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/">Terms & Conditions</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
