import React, { useState, useEffect, useRef } from "react";
import "./css/Player.css";

export default function Player(props) {
  return (
    <div className="player">
      <div className="playerImg">
        <img src={props.src} alt="playerImg" />
        <div className="playerName">{props.name}</div>
      </div>
      <div className="balloon playerExplanation">
        <p>{props.explanation}</p>
      </div>
    </div>
  );
}
