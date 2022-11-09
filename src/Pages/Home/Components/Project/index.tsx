import React from "react";
import style from "./index.module.scss";
import {Link} from "react-router-dom";
import {ProgressBar} from "react-bootstrap";
import {ReactComponent as TelegramIcon} from "@/Assets/Images/Social/Telegram.svg";
import {ReactComponent as TwitterIcon} from "@/Assets/Images/Social/Twitter.svg";
import {ReactComponent as SpeakerIcon} from "@/Assets/Images/Social/Speaker.svg";
import {ReactComponent as DiscordIcon} from "@/Assets/Images/Social/Discord.svg";
import {ReactComponent as GlobalIcon} from "@/Assets/Images/Social/Global.svg";
import {ReactComponent as PaperIcon} from "@/Assets/Images/Social/Paper.svg";

export default function Project() {
  return (
    <div id={`${style["Project"]}`}>
      <Link className={`${style["overlay"]}`} to="/"></Link>
      <div className="d-flex justify-content-between">
        <div className={`${style["name"]}`}>
          <h2 className={`${style["text"]}`}>Template Project</h2>
          <p className={`${style["text-secondary"]}`}>$ATPP</p>
        </div>
        <div className={`${style["project-avatar"]}`}>
          <div className={`${style["avatar"]}`}>
            <img src="/logo512.png" alt="" />
            <div className={`${style["chain"]}`}>
              <img src="/images/network-aptos.png" alt="" />
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
          <DiscordIcon className={`${style["icon"]}`} />
        </Link>
        <Link to="/" className={`${style["social"]}`}>
          <GlobalIcon className={`${style["icon"]}`} />
        </Link>
        <Link to="/" className={`${style["social"]}`}>
          <PaperIcon className={`${style["icon"]}`} />
        </Link>
      </div>

      <div className="mb-3">
        <span className={`${style["badge"]} ${style["badge-gray"]} text-uppercase`}>Upcoming</span>
      </div>

      <p className={`${style["description"]} mb-4`}>
        This is an IDO template project. When a project is accepted, the coming project will be shown like this.
      </p>

      <div className={`${style["details"]} mb-4`}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-white">Fundraise Goal</span>
          <span className={`${style["text-blue"]} h3 mb-0`}>$800.000</span>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <span className="text-white">Price</span>
          <span className={`${style["text-blue"]} text-uppercase`}>ATPP = 0,015 USDT</span>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-white">Max Allocation</span>
          <span className={`${style["text-blue"]} text-uppercase`}>$500</span>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="text-white text-uppercase">TBA</span>
          <span className={`${style["text-blue"]} text-uppercase`}>0%</span>
        </div>
        <ProgressBar className={`${style["progress"]} mb-1`} variant="success" now={0} label={`${0}%`} visuallyHidden />
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-secondary text-uppercase">0 USDT</span>
          <span className={`text-secondary text-uppercase`}>0 / 266,666,667 ATP</span>
        </div>

        {/* <div className="d-flex justify-content-end">
          <div>
            <p className="text-white mb-1">Listing Time</p>
            <p className={`${style["text-blue"]} text-uppercase text-end h5 mb-0`}>TBA</p>
          </div>
        </div> */}
      </div>

      <div className={`${style["footer"]}`}>
        <Link to="">
          Token Sale
        </Link>
      </div>
    </div>
  );
}
