import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./css/Selection.css";
import axios from "axios";

export default function Selection() {
  const learnMode = "0000";
  const quizMode = "1100";
  const [roomId, setRoomId] = useState("");
  const history = useHistory();
  const params = new FormData();

  useEffect(() => {
    axios
      .get("http://localhost/API/User/GetUserInfo.php", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.request.status);
      });
  }, []);

  const doLogout = () => {
    axios
      .get("http://localhost/API/User/Logout.php", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.request.status);
        history.push("/login");
      })
      .catch((error) => {
        console.log(error.request.status);
      });
  };

  const makeLearnRoom = () => {
    params.append("gamemode", learnMode);
    axios
      .post("http://localhost/API/Room/CreateRoom.php", params, {
        withCredentials: true,
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log(result.status);
        params.delete("gamemode");
        history.push("/waiting");
      })
      .catch((error) => {
        console.log(error.request.status);
      });
  };

  const makeQuizRoom = () => {
    params.append("gamemode", quizMode);
    axios
      .post("http://localhost/API/Room/CreateRoom.php", params, {
        withCredentials: true,
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log(result.status);
        params.delete("gamemode");
        history.push("/waiting");
      })
      .catch((error) => {
        console.log(error.request.status);
      });
  };

  const roomIdChange = (event) => {
    setRoomId(event.target.value);
  };

  const joinRoom = () => {
    params.append("roomID", roomId);
    axios
      .post("http://localhost/API/Room/JoinRoom.php", params, {
        withCredentials: true,
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log(result);
        params.delete("roomID");
        history.push("/waiting");
      })
      .catch((error) => {
        console.log(error.request.status);
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
      <button id="learnButton" onClick={makeLearnRoom}>
        学習モード
      </button>
      <button id="quizButton" onClick={makeQuizRoom}>
        クイズモード
      </button>
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
      <button id="library" onClick={moveToLibrary}>
        ライブラリ
      </button>
    </div>
  );
}
