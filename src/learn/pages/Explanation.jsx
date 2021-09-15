import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./css/Explanation.css";
import "../components/css/Balloon.css";
import Title from "../../common/components/Title";
import Image from "../../common/components/Image";
import Icon from "../../common/components/Icon";
import OtherDescription from "../../common/components/OtherDescription";
import AttentionMessage from "../../common/components/AttentionMessage";
import Timer from "../../common/components/Timer";
import TimeUp from "../../common/components/TimeUp";
import aiImg from "../../image/aiImg.svg";
import aiImgSmile from "../../image/aiImgSmile.svg";

function Explanation() {
  const data = {
    playerId: [
      {
        explanation: "百獣の王は静かに微笑みを湛えている",
        ai: "草原でライオンが座っています",
        ngWord: ["草原", "ライオン"],
        synonyms: ["黄色", "ステップ", "草", "獅子", "黄土色"],
      },
      {
        explanation: "プレイヤー説明文",
        ai: "草原でライオンが座っています",
        ngWord: ["草原", "ライオン"],
        synonyms: ["黄色い", "ステップ", "草", "獅子", "黄土色"],
      },
      {
        explanation: "プレイヤー説明文",
        ai: "草原でライオンが座っています",
        ngWord: ["草原", "ライオン"],
        synonyms: ["黄色い", "ステップ", "草", "獅子", "黄土色"],
      },
      {
        explanation: "プレイヤー説明文",
        ai: "草原でライオンが座っています",
        ngWord: ["草原", "ライオン"],
        synonyms: ["黄色い", "ステップ", "草", "獅子", "黄土色"],
      },
    ],
  };
  const [word1, setWord1] = useState("...");
  const [word2, setWord2] = useState("...");
  const [aiExplanation, setAiExplanation] = useState("AI考え中...");
  const [aiFace, setAiFace] = useState(aiImg);
  const [attentionMessage, setAttentionMessage] = useState("");
  const [myExplanation, setMyExplanation] = useState("");
  const history = useHistory();
  const timeFirst = 30;
  const [time, setTime] = useState(timeFirst);
  const timer = useRef(null);

  const handleChange = (event) => {
    setMyExplanation(event.target.value);
  };

  const handleSubmit = (event) => {
    if (myExplanation.length === 0) {
      event.preventDefault();
      setAttentionMessage("説明文を記入して下さい");
      return 0;
    }
  };

  useEffect(() => {
    timer.current = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (time % 3 === 0 && time < 30) {
      setWord2(word1);
      if (data.playerId[0].ngWord[(30 - time - 3) / 3] != null) {
        setWord1(data.playerId[0].ngWord[(30 - time - 3) / 3]);
      } else if (
        data.playerId[0].synonyms[
          (30 - time - 3) / 3 - data.playerId[0].ngWord.length
        ] != null
      ) {
        setWord1(
          data.playerId[0].synonyms[
            (30 - time - 3) / 3 - data.playerId[0].ngWord.length
          ]
        );
      } else {
        setWord1("...");
      }
    }
    switch (time) {
      case timeFirst / 2 + 1:
        setAiFace(aiImgSmile);
        break;
      case timeFirst / 2:
        setAiExplanation(data.playerId[0].ai);
        break;
      case 0:
        clearInterval(timer.current);
        // setTimeout(() => {
        //     history.push("/learn/result");
        // }, 5000);
        break;
    }
  }, [time]);

  return (
    <div id="explanation">
      <Title text="この画像を説明しよう" />
      <Image
        src="https://source.unsplash.com/featured/?lion"
        alt="explanationImg"
      />
      <div className="learn">AIのアイディアを盗もう</div>
      <div className="ai">
        <Icon src={aiFace} />
        <div className="balloon">
          <p>{word1}</p>
          <p>{word2}</p>
        </div>
      </div>
      <OtherDescription title="AIの説明文" text="ライオンがこちらを見ている" />
      <form onSubmit={handleSubmit} id="explanationForm">
        <AttentionMessage text={attentionMessage} />
        <input
          type="text"
          value={myExplanation}
          onChange={handleChange}
          className="textBox"
        />
        <input type="submit" value="送信" />
      </form>
      <Timer time={time} />
      {/*<TimeUp time={time}/>*/}
    </div>
  );
}

export default Explanation;
