import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./css/Selection.css";
import axios from "axios";

export default function Selection() {
  const history = useHistory();

  useEffect(() => {
    axios
      .get(
        "http://localhost/~kubota/procon32_Lets_AIdea_php/API/User/GetUserInfo.php",
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("--- GetUserInfo ---");
        console.log(res);
      })
      .catch((error) => {
        console.log(error.request.status);
      });
  }, []);

  const moveToLibrary = () => {
    history.push("/library");
  };

  return (
    <div id="selection">
      <div id="textMakeRoom">部屋を作る</div>
      <button id="learnButton">学習モード</button>
      <button id="quizButton">クイズモード</button>
      <input type="text" placeholder="部屋IDを入力してね" id="roomId" />
      <div id="textJoinRoom">部屋に入る</div>
      <button id="joinButton">参加</button>
      <button id="library" onClick={moveToLibrary}>
        ライブラリ
      </button>
    </div>
  );
}
