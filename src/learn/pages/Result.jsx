import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./css/Result.css";
import Player from "../components/Player";
import Title from "../../common/components/Title";
import Image from "../../common/components/Image";
import Timer from "../../common/components/Timer";
import aiImg from "../../image/aiImg.svg";

function Result() {
  const wordData = {
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
        explanation:
          "あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ",
        ai: "草原でライオンが座っています",
        ngWord: ["草", "赤い", "光"],
        synonyms: ["黄色い", "ステップ", "草", "獅子", "黄土色"],
      },
    ],
  };
  const userData = {
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
  };
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
      //history.push("/learn/vote");
    }
  }, [time]);

  return (
    <div id="learnResult">
      <Title text="リザルト" />
      <Image
        src="https://source.unsplash.com/featured/?lion"
        alt="explanationImg"
      />
      <div className="players">
        <Player src={aiImg} name="AI" explanation={wordData.playerId[0].ai} />
        <Player
          src={userData.playerId[0].imageIcon}
          name={userData.playerId[0].name}
          explanation={wordData.playerId[0].explanation}
        />
        <Player
          src={userData.playerId[1].imageIcon}
          name={userData.playerId[1].name}
          explanation={wordData.playerId[1].explanation}
        />
        <Player
          src={userData.playerId[2].imageIcon}
          name={userData.playerId[2].name}
          explanation={wordData.playerId[2].explanation}
        />
        <Player
          src={userData.playerId[3].imageIcon}
          name={userData.playerId[3].name}
          explanation={wordData.playerId[3].explanation}
        />
      </div>
      <Timer time={time} />
    </div>
  );
}

export default Result;
