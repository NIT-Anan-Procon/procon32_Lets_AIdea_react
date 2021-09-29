import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./css/Selection.css";

export default function Selection() {
  const learnMode = "0000";
  const quizMode = "1100";
  const [roomId, setRoomId] = useState("");
  const [makeErrorMessage, setMakeErrorMessage] = useState("");
  const [joinErrorMessage, setJoinErrorMessage] = useState("");
  const history = useHistory();
  const params = new FormData();

  const doLogout = () => {
    axios
      .get(import.meta.env.VITE_API_HOST + "/API/User/Logout.php", {
        withCredentials: true,
      })
      .then(() => {
        history.push("");
      });
  };

  const makeRoom = (mode) => {
    switch (mode) {
      case "1":
        params.append("gamemode", learnMode);
        break;
      case "2":
        params.append("gamemode", quizMode);
        break;
      default:
        break;
    }
    axios
      .post(
        import.meta.env.VITE_API_HOST + "/API/Room/CreateRoom.php",
        params,
        {
          withCredentials: true,
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        params.delete("gamemode");
        history.push("/waiting");
      })
      .catch(() => {
        setMakeErrorMessage("ルームを作成できませんでした");
        params.delete("gamemode");
      });
  };

  const roomIdChange = (event) => {
    setRoomId(event.target.value);
  };

  const joinRoom = () => {
    params.append("roomID", roomId);
    axios
      .post(import.meta.env.VITE_API_HOST + "//API/Room/JoinRoom.php", params, {
        withCredentials: true,
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(() => {
        params.delete("roomID");
        history.push("/waiting");
      })
      .catch(() => {
        params.delete("roomID");
        setJoinErrorMessage("部屋IDが間違っています");
      });
  };

  const moveToLibrary = () => {
    history.push("/library");
  };

  return (
    <div id="selection">
      <button id="logoutButton" onClick={doLogout}>
        ログアウト
      </button>
      <div id="textMakeRoom">部屋を作る</div>
      <button id="learnButton" onClick={() => makeRoom("1")}>
        学習モード
      </button>
      <button id="quizButton" onClick={() => makeRoom("2")}>
        クイズモード
      </button>
      <p id="makeErrorMessage">{makeErrorMessage}</p>
      <input
        type="text"
        placeholder="部屋IDを入力してね"
        onChange={roomIdChange}
        id="roomId"
      />
      <div id="textJoinRoom">部屋に入る</div>
      <button id="joinButton" onClick={joinRoom}>
        参加
      </button>
      <p id="joinErrorMessage">{joinErrorMessage}</p>
      <button id="libraryButton" onClick={moveToLibrary}>
        ライブラリ
      </button>
    </div>
  );
}
