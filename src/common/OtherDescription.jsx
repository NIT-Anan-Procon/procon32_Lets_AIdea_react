import React from "react";
import "./css/OtherDescription.css";

export default function OtherDescription(props) {
  return (
    <div className="textBox otherDescription">
      {props.title}
      <p>{props.text}</p>
    </div>
  );
}
