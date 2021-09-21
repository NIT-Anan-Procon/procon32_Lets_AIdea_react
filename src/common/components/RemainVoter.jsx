import React from "react";
import "./css/RemainVoter.css";

export default function remainVoter(props) {
  return <div className="remainVoter">あと{props.people}人</div>;
}
