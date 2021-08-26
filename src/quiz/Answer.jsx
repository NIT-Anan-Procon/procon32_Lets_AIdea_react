import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/Answer.css";
import Timer from "../common/Timer";

export default function Answer() {
  const otherDescriptionOption = [
    "百獣の王は静かに微笑みを湛えている",
    "幾重の鳥居が私たちを待っている",
    "偶像崇拝",
    "自然",
  ];
  const [otherDescription, setOtherDescription] = useState("読み込み中...");
  let myChoice = 1;
  const urlOption = ["lion", "torii", "idol", "nature"];
  const [imageUrl, setImageUrl] = useState("");
  const history = useHistory();
  const [time, setTime] = useState(40);

  // useEffect(() => {
  //     axios.get("url")
  //         .then(res => {
  //             setOtherDescription(res.data);
  //         })
  // }, []);

  if (!otherDescription) return null;

  const handleChange = (event) => {
    myChoice = event.target.value;
  };

  useEffect(() => {
    setInterval(() => {
      setTime((time) => time - 1);
      if (time == 0) return 0;
    }, 1000);
  }, []);

  useEffect(() => {
    if (time % 10 == 0) {
      if (time == 0) history.push("/result");
      setOtherDescription(otherDescriptionOption[4 - time / 10]);
      setImageUrl(
        "https://source.unsplash.com/featured/?" + urlOption[4 - time / 10]
      );
    }
  }, [time]);

  return (
    <div id="answer">
      <div className="title">元画像を当てよう</div>
      <div className="textBox otherDescription">
        Togo
        <p>{otherDescription}</p>
      </div>
      <p className="attentionMessage">写真をクリックしてください</p>
      <form id="answerForm">
        <input
          type="radio"
          name="selectImage"
          value={1}
          onChange={handleChange}
          id="myChoice1"
        />
        <label htmlFor="myChoice1" id="image1">
          <img src={imageUrl} />
        </label>
        <input
          type="radio"
          name="selectImage"
          value={2}
          onChange={handleChange}
          id="myChoice2"
        />
        <label htmlFor="myChoice2" id="image2">
          <img src={imageUrl} />
        </label>
        <input
          type="radio"
          name="selectImage"
          value={3}
          onChange={handleChange}
          id="myChoice3"
        />
        <label htmlFor="myChoice3" id="image3">
          <img src={imageUrl} />
        </label>
        <input
          type="radio"
          name="selectImage"
          value={4}
          onChange={handleChange}
          id="myChoice4"
        />
        <label htmlFor="myChoice4" id="image4">
          <img src={imageUrl} />
        </label>
      </form>
      <Timer time={time - Math.floor((time - 1) / 10) * 10} />
    </div>
  );
}
