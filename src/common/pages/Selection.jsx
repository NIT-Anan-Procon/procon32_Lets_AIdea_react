import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./css/Selection.css";
import axios from "axios";

export default function Selection() {
  const [gameMode, setGameMode] = useState("");
  const history = useHistory();
  const params = new FormData();

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

  const makeLearnRoom = () => {
    setGameMode("0000");
    console.log(gameMode);
    params.append("gamemode", gameMode);
    axios
      .post(
        "http://localhost/~kubota/procon32_Lets_AIdea_php/API/Room/CreateRoom.php",
        params,
        {
          withCredentials: true,
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((result) => {
        console.log("--- 学習モード部屋の作成に成功 ---");
        console.log("レスポンス: " + result.status);
        // history.push("/waiting");
      })
      .catch((error) => {
        console.log("--- 学習モード部屋でエラーが発生 ---");
        console.log("レスポンス: " + error.request.status);
      });
  };

  const makeQuizRoom = () => {
    setGameMode("1100");
    console.log(gameMode);
    params.append("gamemode", gameMode);
    axios
      .post(
        "http://localhost/~kubota/procon32_Lets_AIdea_php/API/Room/CreateRoom.php",
        params,
        {
          withCredentials: true,
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((result) => {
        console.log("--- クイズモード部屋の作成に成功 ---");
        console.log("レスポンス: " + result.status);
        // history.push("/waiting");
      })
      .catch((error) => {
        console.log("--- クイズモード部屋でエラーが発生 ---");
        console.log("レスポンス: " + error.request.status);
      });
  };

  const moveToLibrary = () => {
    history.push("/library");
  };

  return (
    <div id="selection">
      <div id="textMakeRoom">部屋を作る</div>
      <button id="learnButton" onClick={makeLearnRoom}>
        学習モード
      </button>
      <button id="quizButton" onClick={makeQuizRoom}>
        クイズモード
      </button>
      <input type="text" placeholder="部屋IDを入力してね" id="roomId" />
      <div id="textJoinRoom">部屋に入る</div>
      <button id="joinButton">参加</button>
      <button id="library" onClick={moveToLibrary}>
        ライブラリ
      </button>
    </div>
  );
}
