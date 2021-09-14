import React from "react";
import "./css/textBox.css";
import "./css/OtherDescription.css";

export default function OtherDescription(props) {
  return (
    <div className="otherDescription textBox">
      {props.title}
      <p>{props.text}</p>
    </div>
  );
}
