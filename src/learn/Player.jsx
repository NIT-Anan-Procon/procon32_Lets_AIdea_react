import React, { useState, useEffect, useRef } from "react";
import "./css/Player.css";
import Icon from "../common/components/Icon";
import Name from "../common/components/Name";

export default function Player(props) {
  return (
    <div className="player">
      <Icon src={props.src} alt="playerImg" />
      <Name text={props.name} />
      <div className="balloon">
        <p>{props.explanation}</p>
      </div>
    </div>
  );
}
