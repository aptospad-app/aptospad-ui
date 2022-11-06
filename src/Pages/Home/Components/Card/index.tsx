import React from "react";
import "./index.scss";

interface ITF_CardProps {
  data: any;
}

export default function Card(props: ITF_CardProps) {
  const {
    icon,
    title,
    message
  } = props.data;

  return (
    <div id="card">
      <i className={`${icon}`}></i>
      <h3>{title}</h3>
      <p dangerouslySetInnerHTML={{"__html": message}} />
    </div>
  );
}

Card.defaultProps = {
};
