import React from "react";
import "./css/SelectionLabel.css";
import Icon from "../../common/components/Icon";
import Name from "../../common/components/Name";
import OtherDescription from "../../common/components/OtherDescription";

export default function selectionLabel(props) {
  return (
    <div className="selectionLabel">
      <Icon src={props.icon} />
      <Name text={props.name} />
      <OtherDescription text={props.explanation} />
    </div>
  );
}
