import React from "react";
import "./css/PointRow.css";
import Icon from "../../common/components/Icon";
import Name from "../../common/components/Name";
import PointCell from "./PointCell";

export default function PointRow(props) {
  return (
    <div id={props.id}>
      <div className="rank">{props.rank}</div>
      <Icon src={props.icon} />
      <Name text={props.name} />
      <PointCell
        class="descriptionPointBox"
        title="説明"
        point={props.descriptionPoint}
      />
      <PointCell
        class="answerPointBox"
        title="回答"
        point={props.answerPoint}
      />
      <PointCell
        class="totalPointBox"
        title="合計"
        point={props.descriptionPoint + props.answerPoint}
      />
    </div>
  );
}
