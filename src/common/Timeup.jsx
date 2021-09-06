import React from "react";
import "./css/TimeUp.css";

export default function TimeUp(props) {
  switch (props.time) {
    case 0:
      return <div className="TimeUp">Time Up</div>;
    default:
      return null;
  }
}
