import React, {useState} from "react";
import style from "./index.module.scss";
import {Link} from "react-router-dom";
import {ProgressBar} from "react-bootstrap";
import {ReactComponent as TelegramIcon} from "@/Assets/Images/Social/Telegram.svg";
import {ReactComponent as TwitterIcon} from "@/Assets/Images/Social/Twitter.svg";
import {ReactComponent as SpeakerIcon} from "@/Assets/Images/Social/Speaker.svg";
import {ReactComponent as DiscordIcon} from "@/Assets/Images/Social/Discord.svg";
import {ReactComponent as GlobalIcon} from "@/Assets/Images/Social/Global.svg";
import {ReactComponent as PaperIcon} from "@/Assets/Images/Social/Paper.svg";
import Projects from "@/Mock/Projects.json";

interface ITF_ProjectCardProps {
  id: string;
}

interface ITF_Project {
  status: "upcoming" | "open" | "funded";
  [key: string]: any;
}

export default function ProjectCard(props: ITF_ProjectCardProps) {
  const [project, setProject] = useState<ITF_Project>((Projects as any)[props.id]);

  return (
    <article className={`${style["project-card"]}`}>
      <Link className={`${style["overlay"]}`} to="/project/1"></Link>

      <header className={style["header"]}>
        <img className={style["banner"]} src="/images/demo-project-banners/sbanner-1.png" alt="" />
        <div className={`${style["wrap-logo"]} ${style[`wrap-logo-${project.status}`]}`}>
          <div className={style["logo"]}>
            <img className={style["icon"]} src="/logo512.png" alt="" />
          </div>
          <div className={style["extend"]}>
            December 20, 2022
          </div>
        </div>
      </header>

      <div className={style["body"]}>
        <h1 className="mt-3 mb-0 text-white h2 fw-bold">AptosPad</h1>
        <ul className={style["details"]}>
          {
            project.status === "funded" &&
            <>
              <li className={style["item"]}>
                <span className={style["name"]}>Participants</span>
                <span className={style["dot"]}></span>
                <span className={style["description"]}>5000</span>
              </li>
            </>
          }

          <li className={style["item"]}>
            <span className={style["name"]}>Total raise</span>
            <span className={style["dot"]}></span>
            <span className={style["description"]}>$500.000</span>
          </li>

          {
            (project.status === "upcoming" || project.status === "open") &&
            <>
              <li className={style["item"]}>
                <span className={style["name"]}>Max Allocation</span>
                <span className={style["dot"]}></span>
                <span className={style["description"]}>$500</span>
              </li>
              <li className={style["item"]}>
                <span className={style["name"]}>Votes</span>
                <span className={style["dot"]}></span>
                <span className={style["description"]}>4000</span>
              </li>
              <li className={style["item"]}>
                <span className={style["name"]}>Likes</span>
                <span className={style["dot"]}></span>
                <span className={style["description"]}>5678</span>
              </li>
            </>
          }
        </ul>

        {
          project.status === "open" &&
          <>
            <ProgressBar className={`${style["progress"]} mb-1`} variant="success" now={20} label={`${0}%`} visuallyHidden />
            <p className="h6 fw-normal text-white">16,938/250,000 APT</p>
          </>
        }
      </div>

      {
        (() => {
          if (project.status === "upcoming") {
            return (
              <div className={style["footer"]}>
                <button type="button" className="btn">Register</button>
              </div>
            );
          } else if (project.status === "open") {
            return (
              <div className={style["footer"]}>
                <button type="button" className="btn">Buy</button>
              </div>
            );
          } else {
            return null;
          }
        })()
      }

    </article>
  );
}
