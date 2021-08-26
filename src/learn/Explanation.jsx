import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/Explanation.css";

function Explanation() {
  const [ai, setAi] = useState({
    word: "...,ライオン,草原,空,ステップ,百獣の王,林,ネコ,キバ,餓狼,動物",
    explanation: "草原でライオンが座っている。",
  });
  const [words, setWords] = useState("");
  const [word1, setWord1] = useState("...");
  const [word2, setWord2] = useState("...");
  const [aiExplanation, setAiExplanation] = useState("AI考え中...");
  const [attentionMessage, setAttentionMessage] = useState("");
  const [myExplanation, setMyExplanation] = useState("");
  const history = useHistory();
  const [time, setTime] = useState(30);
  const [signal, setSignal] = useState("");
  const timer = useRef(null);

  useEffect(() => {
    // axios.get("url")
    //     .then(res => {
    //         setAi(res.data);
    //     })
    setWords(ai.word.split(","));
  }, []);

  if (!ai) return null;

  const handleChange = (event) => {
    setMyExplanation(event.target.value);
  };

  const handleSubmit = (event) => {
    if (myExplanation.length == 0) {
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
    if (time % 3 == 0 && time < 30) {
      setWord2(word1);
      setWord1(words[(30 - time) / 3]);
    }
    if (time == 15) {
      setAiExplanation(ai.explanation);
    }
    if (time == 0) {
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
      <img src="https://source.unsplash.com/featured/?lion" />
      <div className="learn">AIのアイディアを盗もう</div>
      <div className="ai">
        <div className="aiImg"></div>
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
      <div className="timer">{time}</div>
      <div className="signal">{signal}</div>
    </div>
  );
}

export default Explanation;
