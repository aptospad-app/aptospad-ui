import React from "react";
import style from "./index.module.scss";
import {ITF_WhyChooseThisToken} from "@/TS";

interface ITF_CardProps {
  data: ITF_WhyChooseThisToken;
}

export default function Card(props: ITF_CardProps) {
  const {
    icon,
    message
  } = props.data;

  return (
    <div className={`${style["card"]} cbtn cbtn-outline-gradient-blue`}>
      <img src={icon} alt="" />
      <p className={`${style["description"]}`} dangerouslySetInnerHTML={{"__html": message}} />
    </div>
  );
}
