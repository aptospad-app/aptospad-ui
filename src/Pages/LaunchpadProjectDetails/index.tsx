import React from "react";
import "./index.scss";
import {useParams} from "react-router-dom";

export default function LaunchpadProjectDetailsScreen() {
  const {id} = useParams();

  return (
    <div id="launchpad-project-details">
      <div className="wrap-page container-fluid">
          launchpad-project-details - I am project {id}
      </div>
    </div>
  );
}
