import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./css/waiting.css";
import axios from "axios";

export default function Waiting() {
  // const [roomId, setRoomId] = useState("123456789");

  const copyText = () => {
    navigator.clipboard.writeText("123456789").then((r) => "Copy failed.");
    console.log("Copied!");
  };

  const startHandle = () => {
    console.log("Game Start !!");
  };

  return (
    <div id="waiting">
      <div id="room">部屋ID</div>
      <div id="roomId">123456789</div>
      <button id="copyButton" onClick={copyText}>
        コピーする
      </button>
      <div id="user">
        <div id="icon">アイコン</div>
        <div id="message">888が入室しました</div>
      </div>
      <button id="startButton" onClick={startHandle}>
        ゲームを始める
      </button>
    </div>
  );
}
