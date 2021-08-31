import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./css/Result.css";
import circle from "../image/circle.png";

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
    history.push("/voting");
  };

  return (
    <div id="result">
      <div className="title">結果発表</div>
      <div id="pointTable">
        <div id="firstPlayer">
          <div className="rank">1st</div>
          <img
            src="https://source.unsplash.com/featured/?random"
            className="icon"
          />
          <div className="name">Togo</div>
          <div className="descriptionPointBox">
            説明
            <p>{data.playerId[0].descriptionPoint}[pt]</p>
          </div>
          <div className="answerPointBox">
            回答
            <p>{data.playerId[0].answerPoint}[pt]</p>
          </div>
          <div className="totalPointBox">
            合計
            <p>
              {data.playerId[0].descriptionPoint + data.playerId[0].answerPoint}
              [pt]
            </p>
          </div>
        </div>
        <div id="secondPlayer">
          <div className="rank">2nd</div>
          <img
            src="https://source.unsplash.com/featured/?random"
            className="icon"
          />
          <div className="name">Taiki</div>
          <div className="descriptionPointBox">
            説明
            <p>{data.playerId[1].descriptionPoint}[pt]</p>
          </div>
          <div className="answerPointBox">
            回答
            <p>{data.playerId[1].answerPoint}[pt]</p>
          </div>
          <div className="totalPointBox">
            合計
            <p>
              {data.playerId[1].descriptionPoint + data.playerId[1].answerPoint}
              [pt]
            </p>
          </div>
        </div>
        <div id="thirdPlayer">
          <div className="rank">3rd</div>
          <img
            src="https://source.unsplash.com/featured/?random"
            className="icon"
          />
          <div className="name">Ibuki</div>
          <div className="descriptionPointBox">
            説明
            <p>{data.playerId[2].descriptionPoint}[pt]</p>
          </div>
          <div className="answerPointBox">
            回答
            <p>{data.playerId[2].answerPoint}[pt]</p>
          </div>
          <div className="totalPointBox">
            合計
            <p>
              {data.playerId[2].descriptionPoint + data.playerId[2].answerPoint}
              [pt]
            </p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="buttonForm">
        <input type="submit" value="投票へ" />
      </form>
    </div>
  );
}
