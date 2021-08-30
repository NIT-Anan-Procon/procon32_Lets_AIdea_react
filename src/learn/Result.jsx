import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/Result.css";

function Result() {
  const [ai, setAI] = useState("");
  const [explanation, setExplanation] = useState({
    player1: "",
    player2: "",
    player3: "",
    player4: "",
  });
  const [icon, setIcon] = useState({
    player1: "",
    player2: "",
    player3: "",
    player4: "",
  });
  const history = useHistory();
  const [time, setTime] = useState(10);
  const timer = useRef(null);

  useEffect(() => {
    // axios.get("url")
    //     .then(res => {
    //        setAI(res.data);
    //        setExplanation(res.data);
    //        setIcon(res.data);
    //     })
    setAI("草原でライオンが座っている。");

    setExplanation({ ...explanation, player1: "ライオンが歩いている" });
    setExplanation({ ...explanation, player2: "ライオンがたたずんでいる" });
    setExplanation({ ...explanation, player3: "獅子の雄たけび" });
    setExplanation({ ...explanation, player4: "人がライオンと認識するもの" });
    setIcon({
      ...explanation,
      player1: "https://source.unsplash.com/featured/?dog",
    });
    setIcon({
      ...explanation,
      player2: "https://source.unsplash.com/featured/?town",
    });
    setIcon({
      ...explanation,
      player3: "https://source.unsplash.com/featured/?sea",
    });
    setIcon({
      ...explanation,
      player4: "https://source.unsplash.com/featured/?food",
    });
  });

  useEffect(() => {
    timer.current = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
  }, []);

  //if (time === 0) {history.push("/vote");}

  return (
    <div id="result">
      <div className="title">リザルト</div>
      <div className="explanationImg">
        <img
          src="https://source.unsplash.com/featured/?lion"
          alt="explanationImg"
        />
      </div>
      <div className="player">
        <div className="playerImg">
          <img src="https://source.unsplash.com/featured/?AI" alt="ai1Img" />
        </div>
        <div className="textBox playerExplanation">{ai}</div>
      </div>
      <div className="player">
        <div className="playerImg">
          <img src={icon.player1} alt="player1Img" />
        </div>
        <div className="textBox playerExplanation">{explanation.player1}</div>
      </div>
      <div className="player">
        <div className="playerImg">
          <img src={icon.player2} alt="player2Img" />
        </div>
        <div className="textBox playerExplanation">{explanation.player2}</div>
      </div>
      <div className="player">
        <div className="playerImg">
          <img src={icon.player3} alt="player3Img" />
        </div>
        <div className="textBox playerExplanation">{explanation.player3}</div>
      </div>
      <div className="player">
        <div className="playerImg">
          <img src={icon.player4} alt="player4Img" />
        </div>
        <div className="textBox playerExplanation">{explanation.player4}</div>
      </div>
    </div>
  );
}

export default Result;
