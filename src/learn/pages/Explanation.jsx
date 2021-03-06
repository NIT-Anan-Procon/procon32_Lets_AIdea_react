import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./css/Explanation.css";
import "./css/learn.css";
import "../components/css/Balloon.css";
import Icon from "../../common/components/Icon";
import Image from "../../common/components/Image";
import OtherDescription from "../../common/components/OtherDescription";
import TimeUp from "../../common/components/TimeUp";
import Timer from "../../common/components/Timer";
import Title from "../../common/components/Title";
import aiImg from "../../image/aiImg.svg";
import aiImgSmile from "../../image/aiImgSmile.svg";

function Explanation() {
  const [data, setData] = useState();
  const [word1, setWord1] = useState("...");
  const [word2, setWord2] = useState("...");
  const [aiExplanation, setAiExplanation] = useState("AI考え中...");
  const [aiFace, setAiFace] = useState(aiImg);
  const [myExplanation, setMyExplanation] = useState(" ");
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("読み込み中");
  const [time, setTime] = useState(60);
  const timer = useRef(null);
  const params = new FormData();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_HOST + "/API/Learn/StartLearn.php", {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        setErrorMessage("エラーが発生しました");
      });
  }, []);

  const handleChange = (event) => {
    setMyExplanation(event.target.value);
  };

  useEffect(() => {
    timer.current = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-empty
    if (!data) {
    } else {
      if (time % 5 === 0 && time < 60) {
        setWord2(word1);
        if (data.synonyms[(60 - time - 5) / 5] != null) {
          setWord1(data.synonyms[(60 - time - 5) / 5]);
        } else {
          setWord1("...");
        }
      }
      switch (time) {
        case 60 / 2 + 1:
          setAiFace(aiImgSmile);
          break;
        case 60 / 2:
          setAiExplanation(data.AI);
          break;
        case 0:
          clearInterval(timer.current);
          document.getElementById("myExplanation").disabled = true;
          params.append("explanation", myExplanation);
          axios
            .post(
              import.meta.env.VITE_API_HOST + "/API/Game/AddExplanation.php",
              params,
              {
                withCredentials: true,
              }
            )
            .then(() => {
              setTimeout(() => {
                history.push("/learn/result");
              }, 5000);
            });
          break;
      }
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
      <div className="learn" id="explanation">
        <Title text="この画像を説明しよう" />
        <Image src={data.pictureURL} alt="explanationImg" />
        <div className="learn">AIのアイディアを盗もう</div>
        <div className="ai">
          <Icon src={aiFace} />
          <div className="balloon">
            <p>{word1}</p>
            <p>{word2}</p>
          </div>
        </div>
        <OtherDescription title="AIの説明文" text={aiExplanation} />
        <form id="explanationForm">
          <input
            type="text"
            value={myExplanation}
            onChange={handleChange}
            placeholder="説明文を記入してね"
            className="textBox"
            id="myExplanation"
          />
        </form>
        <Timer time={time} />
        <TimeUp time={time} />
      </div>
    );
  }
}

export default Explanation;
