import React from "react";
import { Link } from "react-router-dom";

export default function Test() {
  return (
    <>
      <Link to="/learn/Explanation">
        <p>learn/Explanation</p>
      </Link>
      <Link to="/learn/result">
        <p>learn/result</p>
      </Link>
      <Link to="/quiz/description">
        <p>quiz/description</p>
      </Link>
      <Link to="/quiz/answer">
        <p>quiz/answer</p>
      </Link>
      <Link to="/quiz/result">
        <p>quiz/result</p>
      </Link>
      <Link to="/quiz/voting">
        <p>quiz/voting</p>
      </Link>
      <Link to="/quiz/award">
        <p>quiz/award</p>
      </Link>
      <Link to="/selection">
        <p>/election</p>
      </Link>
      <Link to="/waiting">
        <p>/waiting</p>
      </Link>
    </>
  );
}
