import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./css/Result.css";
import Timer from "../common/Timer";

function Result() {
  const [wordData, setWordData] = useState({
    playerId: [
      {
        explanation: "百獣の王は静かに微笑みを湛えている",
        ai: "草原でライオンが座っています",
        ngWord: ["草原", "ライオン"],
        synonyms: ["黄色い", "ステップ", "草", "獅子", "黄土色"],
      },
      {
        explanation: "狙った獲物は逃がさない",
        ai: "草原でライオンが座っています",
        ngWord: ["草", "赤い", "光"],
        synonyms: ["黄色い", "ステップ", "草", "獅子", "黄土色"],
      },
      {
        explanation: "プレイヤー説明文",
        ai: "草原でライオンが座っています",
        ngWord: ["草", "赤い", "光"],
        synonyms: ["黄色い", "ステップ", "草", "獅子", "黄土色"],
      },
      {
        explanation: "プレイヤー説明文",
        ai: "草原でライオンが座っています",
        ngWord: ["草", "赤い", "光"],
        synonyms: ["黄色い", "ステップ", "草", "獅子", "黄土色"],
      },
    ],
  });
  const [userData, setUserData] = useState({
    playerId: [
      {
        userID: 1111,
        flag: 1,
        name: "Togo",
        imageIcon: "https://source.unsplash.com/featured/?dog",
        badge: null,
      },
      {
        userID: 1112,
        flag: 0,
        name: "Taiki",
        imageIcon: "https://source.unsplash.com/featured/?food",
        badge: null,
      },
      {
        userID: 1113,
        flag: 0,
        name: "Ibuki",
        imageIcon: "https://source.unsplash.com/featured/?bard",
        badge: null,
      },
      {
        userID: 1114,
        flag: 0,
        name: "Maoki",
        imageIcon: "https://source.unsplash.com/featured/?king",
        badge: null,
      },
    ],
  });
  const history = useHistory();
  const [time, setTime] = useState(10);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (time === 0) {
      clearInterval(timer.current);
      history.push("/vote");
    }
  }, [time]);

  return (
    <div id="result">
      <div className="title">リザルト</div>
      <div className="explanationImg">
        <img
          src="https://source.unsplash.com/featured/?lion"
          alt="explanationImg"
        />
      </div>
      <div className="players">
        <div className="player">
          <div className="playerImg">
            <img src="https://source.unsplash.com/featured/?ai" alt="ai1Img" />
            <div className="playerName">AI</div>
          </div>
          <div className="balloon playerExplanation">
            <p>{wordData.playerId[0].ai}</p>
          </div>
        </div>
        <div className="player">
          <div className="playerImg">
            <img src={userData.playerId[0].imageIcon} alt="player1Img" />
            <div className="playerName">{userData.playerId[0].name}</div>
          </div>
          <div className="balloon playerExplanation">
            <p>{wordData.playerId[0].explanation}</p>
          </div>
        </div>
        <div className="player">
          <div className="playerImg">
            <img src={userData.playerId[1].imageIcon} alt="player2Img" />
            <div className="playerName">{userData.playerId[1].name}</div>
          </div>
          <div className="balloon playerExplanation">
            <p>{wordData.playerId[1].explanation}</p>
          </div>
        </div>
        <div className="player">
          <div className="playerImg">
            <img src={userData.playerId[2].imageIcon} alt="player3Img" />
            <div className="playerName">{userData.playerId[2].name}</div>
          </div>
          <div className="balloon playerExplanation">
            <p>{wordData.playerId[2].explanation}</p>
          </div>
        </div>
        <div className="player">
          <div className="playerImg">
            <img src={userData.playerId[3].imageIcon} alt="player4Img" />
            <div className="playerName">{userData.playerId[3].name}</div>
          </div>
          <div className="balloon playerExplanation">
            <p>{wordData.playerId[3].explanation}</p>
          </div>
        </div>
      </div>
      <Timer time={time} />
    </div>
  );
}

export default Result;
