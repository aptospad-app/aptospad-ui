import React, {useEffect} from "react";
import "./index.scss";

export default function LoadingSpinner() {
  const body = document.body;
  useEffect(() => {
    body.style.height = "100vh";
    body.style.overflow = "hidden";

    return function cleanup() {
      body.style.height = "initial";
      body.style.overflow = "initial";
    };
  });

  return (
    <div id="loading-spinner">
      <div className="circle1"></div>
      <div className="circle2"></div>
    </div>
  );
}
