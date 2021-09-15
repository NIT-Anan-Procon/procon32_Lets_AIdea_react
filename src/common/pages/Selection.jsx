import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./css/Selection.css";
import axios from "axios";

export default function Selection() {
  return (
    <div id="selection">
      <div className="textRoom">部屋を作る</div>
      <button id="learnButton">学習モード</button>
      <button id="quizButton">クイズモード</button>
      <div className="textRoom">部屋に入る</div>
      <button id="joinButton">参加</button>
      <button>ライブラリ</button>
    </div>
  );
}
