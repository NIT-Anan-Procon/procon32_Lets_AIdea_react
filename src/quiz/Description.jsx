import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./css/quiz.css";
import "./css/Description.css";
import AttentionMessage from "../common/AttentionMessage";
import Timer from "../common/Timer";

export default function Description() {
  const [data, setData] = useState({
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
  const [ngWord, setNgWord] = useState("");
  const [attentionMessage, setAttentionMessage] = useState("");
  const [myDescription, setMyDescription] = useState("");
  const history = useHistory();
  const [time, setTime] = useState(30);

  useEffect(() => {
    // TODO: APIとの通信
    for (let i = 0; i < data.playerId[0].ngWord.length; i++) {
      setNgWord((ngWord) => ngWord + data.playerId[0].ngWord[i]);
      if (i !== data.playerId[0].ngWord.length - 1)
        setNgWord((ngWord) => ngWord + ", ");
    }
  }, []);

  const handleChange = (event) => {
    setMyDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    if (myDescription.length === 0) {
      event.preventDefault();
      setAttentionMessage("説明文を記入して下さい");
      return 0;
    }
    for (let i = 0; i < ngWord.length; i++)
      if (myDescription.indexOf(ngWord[i]) !== -1) {
        event.preventDefault();
        setAttentionMessage("NGワードが含まれています");
        return 0;
      }
    history.push("/answer");
  };

  useEffect(() => {
    setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
  }, []);

  if (time === 0) history.push("/answer");

  return (
    <div id="description">
      <div className="title">この画像を説明しよう</div>
      <img src="https://source.unsplash.com/featured/?lion" alt="問題の画像" />
      <div className="textBox otherDescription">
        AIの説明文
        <p>{data.playerId[0].aiDescription}</p>
      </div>
      <div className="textBox ngWord">
        NGワード
        <p>{ngWord}</p>
      </div>
      <form onSubmit={handleSubmit} id="descriptionForm">
        <AttentionMessage text={attentionMessage} />
        <input
          type="text"
          value={myDescription}
          onChange={handleChange}
          className="textBox"
        />
        <input type="submit" value="送信" />
      </form>
      <Timer time={time} />
    </div>
  );
}
