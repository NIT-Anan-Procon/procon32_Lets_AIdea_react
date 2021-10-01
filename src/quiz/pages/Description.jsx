import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./css/quiz.css";
import "./css/Description.css";
import AttentionMessage from "../../common/components/AttentionMessage";
import Image from "../../common/components/Image";
import NgWord from "../../common/components/NgWord";
import OtherDescription from "../../common/components/OtherDescription";
import TimeUp from "../../common/components/TimeUp";
import Timer from "../../common/components/Timer";
import Title from "../../common/components/Title";

export default function Description() {
  const [data, setData] = useState();
  const [ngWord, setNgWord] = useState("");
  const [attentionMessage, setAttentionMessage] = useState("");
  const [myDescription, setMyDescription] = useState(" ");
  const history = useHistory();
  const params = new FormData();
  const [time, setTime] = useState(60);
  const timer = useRef(null);
  const [errorMessage, setErrorMessage] = useState("読み込み中");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_HOST + "/API/Quiz/StartQuiz.php", {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
        getNgWord(res.data);
      })
      .catch(() => {
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

  useEffect(() => {
    if (time === 0) {
      clearInterval(timer.current);
      document.getElementById("myDescription").disabled = true;
      if (attentionMessage === "NGワードが含まれています")
        setMyDescription("※NGワードが含まれているため表示できません");
      else if (myDescription === " ")
        setMyDescription("※文章が入力されていません");
      params.append("explanation", myDescription);
      axios
        .post(
          import.meta.env.VITE_API_HOST + "/API/Game/AddExplanation.php",
          params,
          {
            withCredentials: true,
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          setTimeout(() => {
            history.push("/quiz/relay");
          }, 5000);
        });
    }
  }, [time]);

  useEffect(() => {
    const onUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onUnload);
    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", () => {
      history.go(1);
    });
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
