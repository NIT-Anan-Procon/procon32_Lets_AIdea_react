import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/Answer.css";

export default function Answer() {
  const [otherDescription, setOtherDescription] =
    useState("百獣の王は静かに微笑みを湛えている");
  const [attentionMessage, setAttentionMessage] =
    useState("写真をクリックしてください");
  const [myChoice, setMyChoice] = useState(0);
  const history = useHistory();
  const [time, setTime] = useState(10);

  // useEffect(() => {
  //     axios.get("url")
  //         .then(res => {
  //             setOtherDescription(res.data);
  //         })
  // }, []);

  if (!otherDescription) return null;

  const handleChange = (event) => {
    setMyChoice(event.target.value);
  };

  const handleSubmit = (event) => {
    if (myChoice == 0) {
      event.preventDefault();
      setAttentionMessage("1つの写真を選んでクリックしてください");
      return 0;
    }
    history.push("/result");
  };

  useEffect(() => {
    // setInterval(() => {
    //     setTime(time => time - 1);
    // }, 1000);
  }, []);

  if (time == 0) history.push("/result");

  return (
    <div id="answer">
      <div className="title">元画像を当てよう</div>
      <div className="textBox otherDescription">
        Togo
        <p>{otherDescription}</p>
      </div>
      <form onSubmit={handleSubmit} id="answerForm">
        <input
          type="radio"
          name="selectImage"
          value={1}
          onChange={handleChange}
          id="myChoice1"
        />
        <label htmlFor="myChoice1" id="image1">
          <img src="https://source.unsplash.com/featured/?lion" />
        </label>
        <input
          type="radio"
          name="selectImage"
          value={2}
          onChange={handleChange}
          id="myChoice2"
        />
        <label htmlFor="myChoice2" id="image2">
          <img src="https://source.unsplash.com/featured/?lion" />
        </label>
        <input
          type="radio"
          name="selectImage"
          value={3}
          onChange={handleChange}
          id="myChoice3"
        />
        <label htmlFor="myChoice3" id="image3">
          <img src="https://source.unsplash.com/featured/?lion" />
        </label>
        <input
          type="radio"
          name="selectImage"
          value={4}
          onChange={handleChange}
          id="myChoice4"
        />
        <label htmlFor="myChoice4" id="image4">
          <img src="https://source.unsplash.com/featured/?lion" />
        </label>
        <p className="attentionMessage">{attentionMessage}</p>
        <input type="submit" value="投票する" />
      </form>
      <div className="timer">{time}</div>
    </div>
  );
}
