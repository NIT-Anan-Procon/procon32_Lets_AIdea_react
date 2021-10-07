import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./css/Waiting.css";
import "../components/Icon";

export default function Waiting() {
  const [data, setData] = useState("");
  const history = useHistory();
  const timer = useRef(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_HOST + "/API/Room/GetRoomInfo.php", {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
      });

    axios.get(import.meta.env.VITE_API_HOST + "/API/Room/PrepareGame.php", {
      withCredentials: true,
    });
  }, []);

  useEffect(() => {
    timer.current = setInterval(() => {
      axios
        .get(import.meta.env.VITE_API_HOST + "/API/Room/GetRoomInfo.php", {
          withCredentials: true,
        })
        .then((res) => {
          setData(res.data);
          if (res.data.status === "1") {
            moveToGame();
          }
        });
    }, 1000);
    return () => clearInterval(timer.current);
  });

  const moveToGame = () => {
    switch (data.gamemode) {
      case "0000":
        history.push("/learn/explanation");
        break;
      case "1100":
        history.push("/quiz/description");
        break;
      default:
        break;
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(data.roomID);
  };

  const startHandle = () => {
    axios
      .get(import.meta.env.VITE_API_HOST + "/API/Room/StartGame.php", {
        withCredentials: true,
      })
      .then(() => {
        moveToGame();
      });
  };

  if (!data) return <div>読み込み中</div>;
  else {
    return (
      <div id="waiting">
        <div id="room">部屋ID</div>
        <div id="roomId">{data.roomID}</div>
        <button id="copyButton" onClick={copyText}>
          コピーする
        </button>
        <div id="user">
          {data.player.map((userData, index) => {
            return (
              <div id="container" key={index}>
                <img alt="ユーザーアイコン" src={userData.icon} id="icon" />
                <div id="message">{userData.name}が入室しました</div>
              </div>
            );
          })}
        </div>
        <button id="startButton" onClick={startHandle}>
          ゲームを始める
        </button>
      </div>
    );
  }
}
