import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./css/Explanation.css";
import Timer from "../common/Timer";

function Explanation() {
  //　TODO data:仮のAPI
  const [data, setData] = useState({
    playerId: [
      {
        explanation: "百獣の王は静かに微笑みを湛えている",
        AI: "草原でライオンが座っています",
        NGword: ["草原", "ライオン"],
        synonyms: ["黄色い", "ステップ", "草", "獅子", "黄土色"],
      },
      {
        explanation: "プレイヤー説明文",
        AI: "AI説明文",
        NGword: ["1", "2", "3"],
        synonyms: ["1", "2", "3"],
      },
      {
        explanation: "プレイヤー説明文",
        AI: "AI説明文",
        NGword: ["1", "2", "3"],
        synonyms: ["1", "2", "3"],
      },
      {
        explanation: "プレイヤー説明文",
        AI: "AI説明文",
        NGword: ["1", "2", "3"],
        synonyms: ["1", "2", "3"],
      },
    ],
  });
  const [word1, setWord1] = useState("...");
  const [word2, setWord2] = useState("...");
  const [aiExplanation, setAiExplanation] = useState("AI考え中...");
  const [attentionMessage, setAttentionMessage] = useState("");
  const [myExplanation, setMyExplanation] = useState("");
  const history = useHistory();
  const [time, setTime] = useState(30);
  const [signal, setSignal] = useState("");
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
      if (data.playerId[0].NGword[(30 - time - 3) / 3] != null) {
        setWord1(data.playerId[0].NGword[(30 - time - 3) / 3]);
      } else if (
        data.playerId[0].synonyms[
          (30 - time - 3) / 3 - data.playerId[0].NGword.length
        ] != null
      ) {
        setWord1(
          data.playerId[0].synonyms[
            (30 - time - 3) / 3 - data.playerId[0].NGword.length
          ]
        );
      } else {
        setWord1("...");
      }
    }
    if (time === 15) {
      setAiExplanation(data.playerId[0].AI);
    }
    if (time === 0) {
      setSignal("Time Up");
      clearInterval(timer.current);
      setTimeout(() => {
        history.push("/result");
      }, 5000);
    }
  }, [time]);

  return (
    <div id="explanation">
      <div className="title">この画像を説明しよう</div>
      <img
        src="https://source.unsplash.com/featured/?lion"
        alt="explanationImg"
      />
      <div className="learn">AIのアイディアを盗もう</div>
      <div className="ai">
        <div className="aiImg">AI</div>
        <div className="textBox word">
          <p>{word1}</p>
          <p>{word2}</p>
        </div>
      </div>
      <div className="textBox aiExplanation">
        AIの説明文
        <p>{aiExplanation}</p>
      </div>
      <form onSubmit={handleSubmit} id="explanationForm">
        <p className="attentionMessage">{attentionMessage}</p>
        <input
          type="text"
          value={myExplanation}
          onChange={handleChange}
          className="textBox"
        />
        <input type="submit" value="送信" />
      </form>
      <Timer time={time} />
      <div className="signal">{signal}</div>
    </div>
  );
}

export default Explanation;
