import React from "react";
import "./css/NgWord.css";

export default function NgWord(props) {
  return (
    <div className="ngWord textBox">
      NGワード
      <p>{props.text}</p>
    </div>
  );
}
