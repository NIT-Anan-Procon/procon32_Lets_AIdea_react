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
      //history.push("/quiz/answer");
    }
  }, [time]);

  window.history.pushState(null, null, location.href);
  window.addEventListener("popstate", (e) => {
    history.go(1);
  });

  return (
    <div className="quiz" id="quizRelay">
      <Title text="元画像当てクイズ" />
      <div id="relayForm">
        <div id="textMassage">
          説明文のもとになった画像を4つの選択肢の中から選ぼう
        </div>
        <AttentionMessage text="※自分の説明文がクイズの時は選べないよ" />
        <div id="example">例</div>
        <Image src={quizImg} alt="クイズのイメージ" />
      </div>
      <div id="scoreForm">
        <div id="scoreTitle">スコア説明</div>
        <div id="scoreExplanation">説明pt：当てられたポイント</div>
        <div id="scoreAnswer">回答pt：当てたポイント</div>
      </div>
      <Timer time={time} />
    </div>
  );
}
