import React from "react";
import { useHistory } from "react-router-dom";
import "./css/waiting.css";
import axios from "axios";

export default function waiting() {
  const copyText = () => {
    navigator.clipboard.writeText("copy");
  };

  return (
    <div id="waiting">
      <text>部屋ID</text>
      <button id="copyButton" onClick={copyText} value="コピー" />
    </div>
  );
}
