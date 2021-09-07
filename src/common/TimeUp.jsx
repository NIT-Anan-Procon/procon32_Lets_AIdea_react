import React from "react";
import "./css/TimeUp.css";

export default function TimeUp(props) {
  if (props.time === 0) {
    return <div className="TimeUp">Time Up</div>;
  } else {
    return null;
  }
}
