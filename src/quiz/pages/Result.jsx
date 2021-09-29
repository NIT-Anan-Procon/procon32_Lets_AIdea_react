import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./css/Result.css";
import Timer from "../../common/components/Timer";
import Title from "../../common/components/Title";
import PointRow from "../components/PointRow";

export default function Result() {
  const [data, setData] = useState();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("読み込み中");
  const [time, setTime] = useState(20);
  const timer = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost/API/Quiz/GetQuizResult.php", {
        withCredentials: true,
      })
      .then((result) => {
        setData(result.data);
      })
      .catch(() => {
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
      history.push("/quiz/voting");
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
  else
    return (
      <div className="quiz" id="quizResult">
        <Title text="結果発表" />
        <div id="pointTable">
          <PointRow
            id="firstPlayer"
            rank="1st"
            icon={data[0].icon}
            name={data[0].name}
            descriptionPoint={data[0].exp}
            answerPoint={data[0].ans}
          />
          <PointRow
            id="secondPlayer"
            rank="2nd"
            icon={data[1].icon}
            name={data[1].name}
            descriptionPoint={data[1].exp}
            answerPoint={data[1].ans}
          />
          <PointRow
            id="thirdPlayer"
            rank="3rd"
            icon={data[2].icon}
            name={data[2].name}
            descriptionPoint={data[2].exp}
            answerPoint={data[2].ans}
          />
        </div>
        <Timer time={time} />
      </div>
    );
}
