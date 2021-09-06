import React from "react";
import "./css/PointRow.css";
import Icon from "../common/Icon";
import Name from "../common/Name";

export default function PointRow(props) {
  return (
    <div id={props.id}>
      <div className="rank">{props.rank}</div>
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
