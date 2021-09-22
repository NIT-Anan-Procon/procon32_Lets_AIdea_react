import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./css/Result.css";
import Player from "../components/Player";
import Title from "../../common/components/Title";
import Image from "../../common/components/Image";
import Timer from "../../common/components/Timer";
import aiImg from "../../image/aiImg.svg";
import axios from "axios";

function Result() {
  const [data, setData] = useState();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("読み込み中");
  const [time, setTime] = useState(10);
  const timer = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost/API/Learn/GetLearnResult.php")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        setErrorMessage("エラーが発生しました");
      });
  }, []);

  useEffect(() => {
    timer.current = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (time === 0) {
      clearInterval(timer.current);
      history.push("/learn/voting");
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
      <div className="learn" id="learnResult">
        <Title text="リザルト" />
        <Image src={data.pictureURL} alt="explanationImg" />
        <div className="players">
          <Player src={aiImg} name="AI" explanation={data.AI} />
          <Player
            src={data.player[1].icon}
            name={data.player[1].name}
            explanation={data.player[1].explanation}
          />
          <Player
            src={data.player[2].icon}
            name={data.player[2].name}
            explanation={data.player[2].explanation}
          />
          <Player
            src={data.player[3].icon}
            name={data.player[3].name}
            explanation={data.player[3].explanation}
          />
          <Player
            src={data.player[4].icon}
            name={data.player[4].name}
            explanation={data.player[4].explanation}
          />
        </div>
        <Timer time={time} />
      </div>
    );
  }
}

export default Result;
