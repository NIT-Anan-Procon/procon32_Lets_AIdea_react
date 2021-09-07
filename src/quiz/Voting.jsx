import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./css/Voting.css";
import Title from "../common/Title";
import Image from "../common/Image";
import AttentionMessage from "../common/AttentionMessage";

export default function Voting() {
  let myChoice = 0;
  const [attentionMessage, setAttentionMessage] = useState("");

  const handleChange = (event) => {
    myChoice = event.target.value;
  };

  const handleSubmit = (event) => {
    if (myChoice === 0) {
      event.preventDefault();
      setAttentionMessage("投票する作品を選んでください");
      return 0;
    }
    history.push("/quiz/award");
  };

  return (
    <div id="voting">
      <Title text="優秀な作品を決めよう" />
      <form onSubmit={handleSubmit} id="votingForm">
        <div id="descriptionTable">
          <input
            type="radio"
            name="selectDescription"
            value={1}
            onChange={handleChange}
            id="myChoice1"
          />
          <label htmlFor="myChoice1" id="image1">
            <Image
              src="https://source.unsplash.com/featured/?lion"
              alt="各プレイヤーのお題画像"
            />
          </label>
        </div>
        <AttentionMessage text={attentionMessage} />
        <input type="submit" value="投票する" />
      </form>
    </div>
  );
}
