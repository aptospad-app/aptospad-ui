import React from "react";
import style from "./index.module.scss";
import ProjectsSlider from "@/Components/ProjectsSlider";

export default function Projects() {
  return (
    <div id={style["projects"]}>
      <div className={`${style["block"]} ${style["block-1"]} container-fluid`}>
        <div className={style["header"]}>
          <h1 className={style["title"]}>Upcoming Projects</h1>
          <div className={style["search-title"]}>Search project</div>
        </div>
        <ProjectsSlider type="upcoming" />
      </div>

      <div className={`${style["block"]} ${style["block-2"]} container-fluid`}>
        <div className={style["header"]}>
          <h1 className={style["title"]}>Open Projects</h1>
          <div className={style["search-title"]}>Search project</div>
        </div>
        <ProjectsSlider type="open" />
      </div>

      <div className={`${style["block"]} ${style["block-3"]} container-fluid`}>
        <div className={style["header"]}>
          <h1 className={style["title"]}>Funded Projects</h1>
          <div className={style["search-title"]}>Search project</div>
        </div>
        <ProjectsSlider type="funded" />
      </div>
    </div>
  );
}
