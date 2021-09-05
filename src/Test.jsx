import React from "react";
import { Link } from "react-router-dom";

export default function Test() {
  return (
    <>
      <Link to="/Explanation">
        <p>learn/Explanation</p>
      </Link>
      <Link to="/description">
        <p>quiz/description</p>
      </Link>
      <Link to="/answer">
        <p>quiz/answer</p>
      </Link>
      <Link to="/result">
        <p>quiz/result</p>
      </Link>
      <Link to="/voting">
        <p>quiz/voting</p>
      </Link>
      <Link to="/award">
        <p>quiz/award</p>
      </Link>
    </>
  );
}
