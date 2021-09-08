import React, { useState, useEffect } from "react";
import "./css/Balloon.css";

export default function Balloon(props) {
  return <div className="balloon">{props.text}</div>;
}
