import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/style.css";
import "./css/Description.css";

export default function Description() {
  const [aiDescription, setAiDescription] = useState({
    description: "草原でライオンが座っている。",
    ngWord: "ライオン,草原",
  });
  const [ngWord, setNgWord] = useState("");
  const [attentionMessage, setAttentionMessage] = useState("");
  const [myDescription, setMyDescription] = useState("");
  const history = useHistory();
  const [time, setTime] = useState(30);

  useEffect(() => {
    // axios.get("url")
    //     .then(res => {
    //         setAiDescription(res.data);
    //     })
    setNgWord(aiDescription.ngWord.split(","));
  }, []);

  if (!aiDescription) return null;

  const handleChange = (event) => {
    setMyDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    if (myDescription.length == 0) {
      event.preventDefault();
      setAttentionMessage("説明文を記入して下さい");
      return 0;
    }
    for (let i = 0; i < ngWord.length; i++)
      if (myDescription.indexOf(ngWord[i]) != -1) {
        event.preventDefault();
        setAttentionMessage("NGワードが含まれています");
        return 0;
      }
    history.push("/answer");
  };

  useEffect(() => {
    // setInterval(() => {
    //     setTime(time => time - 1);
    // }, 1000);
  }, []);

  if (time == 0) history.push("/answer");

  return (
    <div id="description">
      <div className="title">この画像を説明しよう</div>
      <img src="https://source.unsplash.com/featured/?lion" />
      <div className="textBox otherDescription">
        AIの説明文
        <p>{aiDescription.description}</p>
      </div>
      <div className="textBox ngWord">
        NGワード
        <p>{aiDescription.ngWord}</p>
      </div>
      <form onSubmit={handleSubmit} id="descriptionForm">
        <p className="attentionMessage">{attentionMessage}</p>
        <input
          type="text"
          value={myDescription}
          onChange={handleChange}
          className="textBox"
        />
        <input type="submit" value="送信" />
      </form>
      <div className="timer">{time}</div>
    </div>
  );
}
