import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./css/Waiting.css";
import axios from "axios";

export default function Waiting() {
  // const [roomId, setRoomId] = useState("");
  const [data, setData] = useState("");
  const history = useHistory();
  // const timer = useRef();

  useEffect(() => {
    axios
      .get(
        "http://localhost/~kubota/procon32_Lets_AIdea_php/API/Room/GetRoomInfo.php",
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("--- GetRoomInfo ---");
        console.log(res);
        setData(res.data);
        console.log(data);
        // setRoomId(res.roomID);
        // setData(res.data.player);
        // console.log(roomId);
      })
      .catch((error) => {
        console.log(error.request.status);
      });

    axios
      .get(
        "http://localhost/~kubota/procon32_Lets_AIdea_php/API/Room/PrepareGame.php",
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

  // useEffect(() => {
  //     timer.current = setInterval(() => {
  //         axios
  //             .get("http://localhost/~kubota/procon32_Lets_AIdea_php/API/Room/GetRoomInfo.php", {
  //                 withCredentials: true,
  //             })
  //             .then((res) => {
  //                 console.log("--- GetRoomInfo ---");
  //                 console.log(res);
  //                 setData(res.data.player);
  //                 setData(res.data);
  //                 console.log(data);
  //             })
  //             .catch((error) => {
  //                 console.log(error.request.status);
  //             });
  //     }, 1000);
  // }, []);

  const copyText = () => {
    navigator.clipboard.writeText("123456789").then((r) => "Copy failed.");
    // navigator.clipboard.writeText(roomId).then((r) => "Copy failed.");
    console.log("Copied!");
  };

  const startHandle = () => {
    console.log("Game Start !!");
    axios
      .get(
        "http://localhost/~kinoshita/procon32_Lets_AIdea_php/API/Room/StartGame.php",
        {
          withCredentials: true,
        }
      )
      .then(() => {
        console.log("--- StartGame.phpの実行に成功 ---");
        history.push("/");
      })
      .catch(() => {
        console.log("--- StartGame.phpの実行に失敗 ---");
      });
  };

  return (
    <div id="waiting">
      <div id="room">部屋ID</div>
      <div id="roomId">123456789</div>
      <button id="copyButton" onClick={copyText}>
        コピーする
      </button>
      <div id="user">
        {/*{data.map((datas, index) => {*/}
        {/*  return (*/}
        {/*    <div key={index}>*/}
        {/*      <div id="icon">アイコン</div>*/}
        {/*      <div id="message">{datas.name}が入室しました</div>*/}
        {/*    </div>*/}
        {/*  );*/}
        {/*})}*/}
        <div id="icon">アイコン</div>
        <div id="message">userが入室しました</div>
      </div>
      <button id="startButton" onClick={startHandle}>
        ゲームを始める
      </button>
    </div>
  );
}
