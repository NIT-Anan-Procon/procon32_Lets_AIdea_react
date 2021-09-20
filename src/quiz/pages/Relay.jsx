import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./css/Relay.css";
import Title from "../../common/components/Title";
import Image from "../../common/components/Image";
import AttentionMessage from "../../common/components/AttentionMessage";
import Timer from "../../common/components/Timer";
import quizImg from "../../image/quizImg.svg";

export default function Relay() {
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
      history.push("/quiz/answer");
    }
  }, [time]);

  window.history.pushState(null, null, location.href);
  window.addEventListener("popstate", (e) => {
    history.go(1);
  });

  return (
    <div className="quiz" id="quizRelay">
      <Title text="元画像当てクイズ" />
      <div id="quizForm">
        <div className="brockTitle">選択肢から正解と思う写真を選ぼう!</div>
        <Image src={quizImg} alt="クイズのイメージ" />
        <div id="attention">※自分の説明文がクイズの時は選べないよ</div>
      </div>
      <div id="arrow"> </div>
      <div id="scoreForm">
        <div className="brockTitle">友達より多く正解して優勝を目指そう!</div>
        <div id="scoreExplanation">
          <div className="text1">
            クイズを<span id="answered">当ててもらう</span>と...
          </div>
          <div className="text2">
            説明ポイント<span className="point">10pt</span>ゲット!
          </div>
        </div>
        <div id="scoreAnswer">
          <div className="text1">
            クイズを<span id="answer">当てる</span>と...
          </div>
          <div className="text2">
            回答ポイント<span className="point">10pt</span>ゲット!
          </div>
        </div>
        <div id="total">合計で勝負!</div>
      </div>
      <Timer time={time} />
    </div>
  );
}
