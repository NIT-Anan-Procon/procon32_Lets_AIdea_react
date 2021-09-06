import React from "react";
import "./css/PointRow.css";
import Icon from "../common/Icon";
import Name from "../common/Name";

export default function PointRow(props) {
  const rankOption = [
    ["firstPlayer", "1st"],
    ["secondPlayer", "2nd"],
    ["thirdPlayer", "3rd"],
  ];
  return (
    <div id={rankOption[props.number - 1][0]}>
      <div className="rank">{rankOption[props.number - 1][1]}</div>
      <Icon src={props.icon} />
      <Name text={props.name} />
      <div className="descriptionPointBox">
        説明
        <p>{props.descriptionPoint}[pt]</p>
      </div>
      <div className="answerPointBox">
        回答
        <p>{props.answerPoint}[pt]</p>
      </div>
      <div className="totalPointBox">
        合計
        <p>
          {props.descriptionPoint + props.answerPoint}
          [pt]
        </p>
      </div>
    </div>
  );
}
