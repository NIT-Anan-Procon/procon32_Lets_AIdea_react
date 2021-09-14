import React from "react";
import "./css/Timer.css";

export default function Timer(props) {
  return <div className="timer">{props.time}</div>;
}
