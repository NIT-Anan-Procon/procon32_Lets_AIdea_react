import React from "react";
import "./css/Timer.css";

export default function Timer(props) {
  const historyPush = () => {
    props.history.push(props.link);
  };
  return (
    <div className="timer" onClick={() => historyPush()}>
      {props.time}
    </div>
  );
}
