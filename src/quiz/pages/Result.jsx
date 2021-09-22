import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/Result.css";
import Title from "../../common/components/Title";
import PointRow from "../components/PointRow";

export default function Result() {
  const [data, setData] = useState();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("読み込み中");

  useEffect(() => {
    axios
      .get(
        "http://localhost/~kinoshita/procon32_Lets_AIdea_php/API/Quiz/GetQuizResult.php"
      )
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        setErrorMessage("エラーが発生しました");
      });
  }, []);

  const handleSubmit = () => {
    history.push("/quiz/voting");
  };

  window.history.pushState(null, null, location.href);
  window.addEventListener("popstate", (e) => {
    history.go(1);
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
        <form onSubmit={handleSubmit} className="buttonForm">
          <input type="submit" value="投票へ" />
        </form>
      </div>
    );
}
