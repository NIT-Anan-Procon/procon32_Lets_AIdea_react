import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./css/Waiting.css";
import axios from "axios";

export default function Waiting() {
  // const [roomId, setRoomId] = useState("");
  const [data, setData] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost/API/Room/GetRoomInfo.php", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("--- GetRoomInfo ---");
        console.log(res);
        setData(res.data);
      })
      .catch((error) => {
        console.log(error.request.status);
      });
  }, []);

  const copyText = () => {
    navigator.clipboard.writeText("123456789").then((r) => "Copy failed.");
    console.log("Copied!");
  };

  const startHandle = () => {
    console.log("Game Start !!");
    console.log("--- data ---");
    console.log(data[1].name);
    axios
      .get(
        "http://localhost/~kinoshita/procon32_Lets_AIdea_php/API/Room/StartGame.php",
        {
          withCredentials: true,
        }
      )
      .then(() => {
        console.log("--- StartGame.phpの実行に成功 ---");
      })
      .catch(() => {
        console.log("--- StartGame.phpの実行に失敗 ---");
      });
    // data.map((output, index) => {
    //   console.log(output + "  :  " + index);
    // });
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
        <div id="message">{userName}が入室しました</div>
      </div>
      <button id="startButton" onClick={startHandle}>
        ゲームを始める
      </button>
    </div>
  );
}
