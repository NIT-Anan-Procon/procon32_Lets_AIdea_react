import React from "react";
import "./css/Image.css";

export default function Image(props) {
  return (
    <img
      src={props.src}
      alt={props.alt}
      className={props.class}
      id={props.id}
    />
  );
}
