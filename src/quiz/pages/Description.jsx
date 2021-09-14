import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/quiz.css";
import "./css/Description.css";
import Title from "../../common/components/Title";
import Image from "../../common/components/Image";
import OtherDescription from "../../common/components/OtherDescription";
import NgWord from "../../common/components/NgWord";
import AttentionMessage from "../../common/components/AttentionMessage";
import Timer from "../../common/components/Timer";
import TimeUp from "../../common/TimeUp";

export default function Description() {
  const [data, setData] = useState();
  const [ngWord, setNgWord] = useState("");
  const [attentionMessage, setAttentionMessage] = useState("");
  const [myDescription, setMyDescription] = useState("");
  const history = useHistory();
  const [time, setTime] = useState(60);
  const timer = useRef(null);
  const [errorMessage, setErrorMessage] = useState("読み込み中");

  useEffect(() => {
    axios
      .get("http://localhost/API/Start.php")
      .then((res) => {
        console.log(res);
        setData(res.data);
        getNgWord(res.data);
      })
      .catch((error) => {
        console.log(error.request.status);
        setErrorMessage("エラーが発生しました");
      });
  }, []);

  const getNgWord = (data) => {
    for (let i = 0; i < data.ng.length; i++) {
      setNgWord((ngWord) => ngWord + data.ng[i]);
      if (i !== data.ng.length - 1) setNgWord((ngWord) => ngWord + ", ");
    }
  };

  const handleChange = (event) => {
    setMyDescription(event.target.value);
    for (let i = 0; i < data.ng.length; i++)
      if (event.target.value.indexOf(data.ng[i]) !== -1) {
        setAttentionMessage("NGワードが含まれています");
        return 0;
      }
    setAttentionMessage("");
  };

  useEffect(() => {
    timer.current = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
  }, []);

  if (time === 0) {
    clearInterval(timer.current);
    document.getElementById("myDescription").disabled = true;
    setTimeout(() => {
      history.push("/quiz/answer");
    }, 5000);
  }

  window.history.pushState(null, null, location.href);
  window.addEventListener("popstate", (e) => {
    history.go(1);
  });

  if (!data) return <div>{errorMessage}</div>;
  else {
    return (
      <div className="quiz" id="quizDescription">
        <Title text="この画像を説明しよう" />
        <Image src={data.pictureURL} alt="問題の画像" />
        <OtherDescription title="AIの説明文" text={data.AI} />
        <NgWord text={ngWord} />
        <form id="descriptionForm">
          <AttentionMessage text={attentionMessage} />
          <input
            type="text"
            value={myDescription}
            onChange={handleChange}
            placeholder="説明文を記入してね"
            className="textBox"
            id="myDescription"
          />
        </form>
        <Timer time={time} />
        <TimeUp time={time} />
      </div>
    );
  }
}
