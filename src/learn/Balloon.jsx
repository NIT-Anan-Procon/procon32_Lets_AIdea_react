import React from "react";
import "./css/Balloon.css";

export default function Balloon(props) {
  return (
    <div className="balloon">
      <div className="scroll">
        <p>{props.text}</p>
      </div>
    </div>
  );
}
