import React, {useEffect} from "react";
import "./index.scss";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import ReactTooltip from "react-tooltip";
import Card from "./Components/Card";

export default function HomeScreen() {
  const {t} = useTranslation();

  return (
    <React.Fragment>
      <div id="home">
        <div id="block-1">
          <div id="block-1-bg"></div>
          <div className="container">
            <div className="row">
              <div id="slogan-place" className="col-12 col-md-6">
                <h1 className="title">
                AptosPad
                </h1>
                <p className="description">
                The DAO platform on Aptos to accelerate <br/> the future ideals
                </p>
                <div className="d-flex">
                  <button className="cbtn cbtn-lg cbtn-outline-gradient-blue me-2">Upcoming project</button>
                  <button className="cbtn cbtn-lg cbtn-outline-gradient-blue">Launch your App</button>
                </div>
              </div>
              <div id="description-photo" className="col-12 col-md-6 d-none d-md-flex h-100">
                <img className="h-100" src="/images/logo-icon.svg" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div id="block-2">
          <h3 className="text-center">The trusted community - driven platform</h3>
          <div className="container">
            <div className="row">

            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
