import React from "react";
import style from "./index.module.scss";
import {Link} from "react-router-dom";
import {ProgressBar} from "react-bootstrap";
import {ReactComponent as TelegramIcon} from "@/Assets/Images/Social/Telegram.svg";
import {ReactComponent as TwitterIcon} from "@/Assets/Images/Social/Twitter.svg";
import {ReactComponent as SpeakerIcon} from "@/Assets/Images/Social/Speaker.svg";
import {ReactComponent as GlobalIcon} from "@/Assets/Images/Social/Global.svg";
import {ReactComponent as PaperIcon} from "@/Assets/Images/Social/Paper.svg";

export default function Project() {
  return (
    <div id={`${style["Project"]}`}>
      <Link className={`${style["wrap"]}`} to="/">
        <div className="d-flex justify-content-between">
          <div className={`${style["name"]}`}>
            <h2 className={`${style["text"]}`}>Animalia</h2>
            <p className={`${style["text-secondary"]}`}>$ANIM</p>
          </div>
          <div className={`${style["project-avatar"]}`}>
            <div className={`${style["avatar"]}`}>
              <img src="/images/demo/project.png" alt="" />
              <div className={`${style["chain"]}`}>
                <img src="/images/network-binanceSmartChain-color-icon.svg" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex mt-3 mb-4">
          <Link to={"/"} className={`${style["social"]}`}>
            <TelegramIcon className={`${style["icon"]}`} />
          </Link>
          <Link to={"/"} className={`${style["social"]}`}>
            <TwitterIcon className={`${style["icon"]}`} />
          </Link>
          <Link to="/" className={`${style["social"]}`}>
            <SpeakerIcon className={`${style["icon"]}`} />
          </Link>
          <Link to="/" className={`${style["social"]}`}>
            <GlobalIcon className={`${style["icon"]}`} />
          </Link>
          <Link to="/" className={`${style["social"]}`}>
            <PaperIcon className={`${style["icon"]}`} />
          </Link>
        </div>

        <div className="mb-5">
          <span className={`${style["badge"]} ${style["badge-gray"]} text-uppercase`}>Upcoming</span>
        </div>

        <p className={`${style["description"]} mb-5`}>
        UKISS Technology is dedicated in building the next-gen digital security Ecosystem. UKISS Technology is dedicated in building the next-gen digital security Ecosystem.
        </p>

        <div className={`${style["details"]} mb-4`}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-white">Total Raise</span>
            <span className={`${style["text-blue"]} h3 mb-0`}>$200.000</span>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-white">Starts</span>
            <span className={`${style["text-blue"]} text-uppercase`}>TBA</span>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <span className="text-white">Price</span>
            <span className={`${style["text-blue"]} text-uppercase`}>1 ATP = 0.00075 USDT</span>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="text-white text-uppercase">TBA</span>
            <span className={`${style["text-blue"]} text-uppercase`}>0%</span>
          </div>
          <ProgressBar className={`${style["progress"]} mb-1`} variant="success" now={60} label={`${60}%`} visuallyHidden />
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-secondary text-uppercase">0 USDT</span>
            <span className={`text-secondary text-uppercase`}>0 / 266,666,667 ATP</span>
          </div>

          <div className="d-flex justify-content-end">
            <div>
              <p className="text-white mb-1">Listing Time</p>
              <p className={`${style["text-blue"]} text-uppercase text-end h5 mb-0`}>TBA</p>
            </div>
          </div>
        </div>

        <div className={`${style["footer"]}`}>
          This IDO requires KYC verification.
        </div>
      </Link>
    </div>
  );
}
