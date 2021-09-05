import React from "react";
import "./css/AttentionMessage.css";

export default function AttentionMessage(props) {
  return <p className="attentionMessage">{props.text}</p>;
}
