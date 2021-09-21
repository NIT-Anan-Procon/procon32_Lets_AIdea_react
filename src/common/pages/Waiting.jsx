import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./css/Waiting.css";
import "../components/Icon";
import axios from "axios";

export default function Waiting() {
  const [data, setData] = useState("");
  const history = useHistory();
  const timer = useRef(null);

  useEffect(() => {
    axios
      .get(
        "http://localhost/~kinoshita/procon32_Lets_AIdea_php/API/Room/GetRoomInfo.php",
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("--- GetRoomInfo ---");
        setData(res.data);
      })
      .catch((error) => {
        console.log(error.request.status);
      });

    axios
      .get(
        "http://localhost/~kinoshita/procon32_Lets_AIdea_php/API/Room/PrepareGame.php",
        {
          withCredentials: true,
        }
      )
      .then(() => {
        console.log("--- PrepareGame.phpの実行に成功 ---");
      })
      .catch(() => {
        console.log("--- PrepareGame.phpの実行に失敗 ---");
      });
  }, []);

  useEffect(() => {
    timer.current = setInterval(() => {
      axios
        .get(
          "http://localhost/~kinoshita/procon32_Lets_AIdea_php/API/Room/GetRoomInfo.php",
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log("--- GetRoomInfo ---");
          setData(res.data);
          console.log(data);
          if (res.data.status === "1") {
            clearInterval(timer.current);
            moveToGame();
          }
        })
        .catch((error) => {
          console.log(error.request.status);
        });
    }, 2000);
  }, []);

  const moveToGame = () => {
    switch (data.gamemode) {
      case "0000":
        history.push("/learn/explanation");
        break;
      case "1100":
        history.push("/quiz/description");
        break;
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(data.roomID).then((r) => "Copy failed.");
    console.log("Copied!");
  };

  const startHandle = () => {
    console.log("Game Start !!");
    axios
      .get("http://localhost/API/Room/StartGame.php", {
        withCredentials: true,
      })
      .then(() => {
        console.log("--- StartGame.phpの実行に成功 ---");
        moveToGame();
      })
      .catch(() => {
        console.log("--- StartGame.phpの実行に失敗 ---");
      });
  };

  if (!data) {
    return <div>読み込み中</div>;
  } else {
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
                <img src={userData.icon} id="icon" />
                <div id="message">{userData.name}が入室しました</div>
              </div>
            );
          })}
        </div>
        {(() => {
          if (data.playerID === "1") {
            return (
              <button id="startButton" onClick={startHandle}>
                ゲームを始める
              </button>
            );
          }
        })()}
      </div>
    );
  }
}
