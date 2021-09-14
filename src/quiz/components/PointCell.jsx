import React from "react";
import "./css/PointCell.css";

export default function PointCell(props) {
  return (
    <div className={props.class}>
      {props.title}
      <p>{props.point}[pt]</p>
    </div>
  );
}
