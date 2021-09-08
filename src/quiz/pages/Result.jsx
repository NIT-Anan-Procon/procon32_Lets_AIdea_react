import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./css/Result.css";
import Title from "../../common/components/Title";
import PointRow from "../components/PointRow";

export default function Result() {
  const [data, setData] = useState({
    playerId: [
      {
        descriptionPoint: 30,
        answerPoint: 30,
        voting: 2,
      },
      {
        descriptionPoint: 20,
        answerPoint: 20,
        voting: 1,
      },
      {
        descriptionPoint: 10,
        answerPoint: 10,
        voting: 1,
      },
      {
        descriptionPoint: 0,
        answerPoint: 0,
        voting: 0,
      },
    ],
  });
  const history = useHistory();

  useEffect(() => {
    // TODO: APIとの通信
  }, []);

  const handleSubmit = () => {
    history.push("/quiz/voting");
  };

  return (
    <div id="result">
      <Title text="結果発表" />
      <div id="pointTable">
        <PointRow
          id="firstPlayer"
          rank="1st"
          icon="https://source.unsplash.com/featured/?random"
          name="Togo"
          descriptionPoint={data.playerId[0].descriptionPoint}
          answerPoint={data.playerId[0].answerPoint}
        />
        <PointRow
          id="secondPlayer"
          rank="2nd"
          icon="https://source.unsplash.com/featured/?random"
          name="Taiki"
          descriptionPoint={data.playerId[1].descriptionPoint}
          answerPoint={data.playerId[1].answerPoint}
        />
        <PointRow
          id="thirdPlayer"
          rank="3rd"
          icon="https://source.unsplash.com/featured/?random"
          name="Ibuki"
          descriptionPoint={data.playerId[2].descriptionPoint}
          answerPoint={data.playerId[2].answerPoint}
        />
      </div>
      <form onSubmit={handleSubmit} className="buttonForm">
        <input type="submit" value="投票へ" />
      </form>
    </div>
  );
}
