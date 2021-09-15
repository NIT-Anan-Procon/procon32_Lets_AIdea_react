import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./css/Selection.css";
import axios from "axios";

export default function Selection() {
  return (
    <div id="selection">
      <div id="textMakeRoom">部屋を作る</div>
      <button id="learnButton">学習モード</button>
      <button id="quizButton">クイズモード</button>
      <input type="text" placeholder="部屋IDを入力してね" id="roomId" />
      <div id="textJoinRoom">部屋に入る</div>
      <button id="joinButton">参加</button>
      <button id="library">ライブラリ</button>
    </div>
  );
}
