import React from "react";
import "./css/Player.css";
import Icon from "../../common/components/Icon";
import Name from "../../common/components/Name";
import Balloon from "./Balloon";

export default function Player(props) {
  if (props.src == null && props.name == null && props.explanation == null)
    return null;
  else {
    return (
      <div className="player">
        <Icon src={props.src} alt="playerImg" />
        <Name text={props.name} />
        <Balloon text={props.explanation} />
      </div>
    );
  }
}
