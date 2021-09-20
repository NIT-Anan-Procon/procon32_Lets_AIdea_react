import React from "react";
import "./css/Balloon.css";

export default function Balloon(props) {
  return (
    <div className="balloon">
      <div className="balloonText">
        <p>{props.text}</p>
      </div>
    </div>
  );
}
