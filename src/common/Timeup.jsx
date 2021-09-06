import React from "react";
import "./css/TimeUp.css";

export default function TimeUp(props) {
  if (props.sign != null) {
    return <div className="TimeUp">{props.sign}</div>;
  } else {
    return null;
  }
}
