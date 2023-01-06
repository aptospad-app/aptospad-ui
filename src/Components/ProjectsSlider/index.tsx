import React, {useState, useEffect} from "react";
import style from "./index.module.scss";
import ProjectCard from "@/Components/ProjectCard";
import Slider, {Settings} from "react-slick";
import {CustomHookUtility} from "@/Utilities";

interface ITF_ProjectsSliderProps {
  type?: "upcoming" | "open" | "funded";
}

export default function ProjectsSlider(props: ITF_ProjectsSliderProps) {
  const {width, height} = CustomHookUtility.useWindowDimensions();
  const [settings, setSettings] = useState<Settings>({
    "dots": false,
    "infinite": false,
    "speed": 500,
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "className": style["my-slider"]
  });

  useEffect(() => {
    if (width) {
      if (width <= 768) {
        setSettings({...settings, "slidesToShow": 1});
      } else if (width > 768 && width <= 1200) {
        setSettings({...settings, "slidesToShow": 2});
      } else {
        setSettings({...settings, "slidesToShow": 3});
      }
    }
  }, [width]);

  return (
    <div className={`${style["projects-slider"]}`}>
      {
        (() => {
          if (props.type) {
            if (props.type === "upcoming") {
              return (
                <Slider {...settings}>
                  <div className="px-2">
                    <ProjectCard id={"1"} />
                  </div>
                  <div className="px-2">
                    <ProjectCard id={"1"} />
                  </div>
                  <div className="px-2">
                    <ProjectCard id={"1"} />
                  </div>
                  <div className="px-2">
                    <ProjectCard id={"1"} />
                  </div>
                  <div className="px-2">
                    <ProjectCard id={"1"} />
                  </div>
                </Slider>
              );
            } else if (props.type === "open") {
              return (
                <Slider {...settings}>
                  <div className="px-2">
                    <ProjectCard id={"2"} />
                  </div>
                  <div className="px-2">
                    <ProjectCard id={"2"} />
                  </div>
                  <div className="px-2">
                    <ProjectCard id={"2"} />
                  </div>
                  <div className="px-2">
                    <ProjectCard id={"2"} />
                  </div>
                  <div className="px-2">
                    <ProjectCard id={"2"} />
                  </div>
                </Slider>
              );
            } else {
              return (
                <Slider {...settings}>
                  <div className="px-2">
                    <ProjectCard id={"3"} />
                  </div>
                  <div className="px-2">
                    <ProjectCard id={"3"} />
                  </div>
                  <div className="px-2">
                    <ProjectCard id={"3"} />
                  </div>
                  <div className="px-2">
                    <ProjectCard id={"3"} />
                  </div>
                  <div className="px-2">
                    <ProjectCard id={"3"} />
                  </div>
                </Slider>
              );
            }
          } else {
            return (
              <Slider {...settings}>
                <div className="px-2">
                  <ProjectCard id={"1"} />
                </div>
                <div className="px-2">
                  <ProjectCard id={"2"} />
                </div>
                <div className="px-2">
                  <ProjectCard id={"3"} />
                </div>
                <div className="px-2">
                  <ProjectCard id={"1"} />
                </div>
                <div className="px-2">
                  <ProjectCard id={"2"} />
                </div>
              </Slider>
            );
          }
        })()
      }
    </div>
  );
}
