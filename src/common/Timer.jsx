import React from "react";
import "./css/timer.css";

export default function Timer(props) {
  return <div className="timer">{props.time}</div>;
}
