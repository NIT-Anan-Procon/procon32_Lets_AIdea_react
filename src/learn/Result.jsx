import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./css/Result.css";
import Timer from "../common/Timer";

function Result() {
  const [wordData, setWordData] = useState({
    playerId: [
      {
        playerDescription: "百獣の王は静かに微笑みを湛えている",
        aiDescription: "草原でライオンが座っています",
        ngWord: ["草原", "ライオン"],
      },
      {
        playerDescription: "幾重の鳥居が私たちを待っている",
        aiDescription: "草に囲まれた赤い建物に光が当たっています",
        ngWord: ["草", "赤い", "光"],
      },
      {
        playerDescription: "プレイヤー説明文",
        aiDescription: "AI説明文",
        ngWord: ["NG1", "NG2", "NG3"],
      },
      {
        playerDescription: "プレイヤー説明文",
        aiDescription: "AI説明文",
        ngWord: ["NG1", "NG2", "NG3"],
      },
    ],
  });
  const [userData, setUserData] = useState({
    playerId: [
      {
        userID: 1111,
        flag: 1,
        name: "Togo",
        image_icon: "https://source.unsplash.com/featured/?dog",
        badge: null,
      },
      {
        userID: 1112,
        flag: 0,
        name: "Taiki",
        image_icon: "https://source.unsplash.com/featured/?food",
        badge: null,
      },
      {
        userID: 1113,
        flag: 0,
        name: "Ibuki",
        image_icon: "https://source.unsplash.com/featured/?bard",
        badge: null,
      },
      {
        userID: 1114,
        flag: 0,
        name: "Maoki",
        image_icon: "https://source.unsplash.com/featured/?king",
        badge: null,
      },
    ],
  });
  const history = useHistory();
  const [time, setTime] = useState(10);
  const timer = useRef(null);

  useEffect(() => {}, []);

  useEffect(() => {
    timer.current = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
  }, []);

  if (time === 0) {
    history.push("/vote");
  }

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
          <div className="textBox playerExplanation">
            {wordData.playerId[0].aiDescription}
          </div>
        </div>
        <div className="player">
          <div className="playerImg">
            <img src={userData.playerId[0].image_icon} alt="player1Img" />
            <div className="playerName">{userData.playerId[0].name}</div>
          </div>
          <div className="textBox playerExplanation">
            {wordData.playerId[0].playerDescription}
          </div>
        </div>
        <div className="player">
          <div className="playerImg">
            <img src={userData.playerId[1].image_icon} alt="player2Img" />
            <div className="playerName">{userData.playerId[1].name}</div>
          </div>
          <div className="textBox playerExplanation">
            {wordData.playerId[1].playerDescription}
          </div>
        </div>
        <div className="player">
          <div className="playerImg">
            <img src={userData.playerId[2].image_icon} alt="player3Img" />
            <div className="playerName">{userData.playerId[2].name}</div>
          </div>
          <div className="textBox playerExplanation">
            {wordData.playerId[2].playerDescription}
          </div>
        </div>
        <div className="player">
          <div className="playerImg">
            <img src={userData.playerId[3].image_icon} alt="player4Img" />
            <div className="playerName">{userData.playerId[3].name}</div>
          </div>
          <div className="textBox playerExplanation">
            {wordData.playerId[3].playerDescription}
          </div>
        </div>
      </div>
      <Timer time={time} />
    </div>
  );
}

export default Result;
