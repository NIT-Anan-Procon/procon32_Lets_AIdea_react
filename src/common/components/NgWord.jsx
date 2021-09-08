import React from "react";
import "./css/NgWord.css";

export default function NgWord(props) {
  return (
    <div className="textBox ngWord">
      NGワード
      <p>{props.text}</p>
    </div>
  );
}
